import {
  API_STATUS,
  NOTIFICATION_TYPE,
  SCREEN_ROUTER_APP,
} from '@app/constant/Constant'
import { Body, Item } from './model'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, dimensions, fonts, styleView } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import {
  readAllNotify,
  readNotificationForId,
  requestListNotificationThunk,
  setCountNotify,
} from './slice'
import {
  requestCountNotification,
  requestReadAllNotification,
  requestReadNotification,
} from './api'
import { useAppDispatch, useAppSelector } from '@app/store'

import DateUtils from '@app/utils/DateUtils'
import Empty from '@app/components/Empty/Empty'
import Error from '@app/components/Error/Error'
import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'

const NotificationScreen = () => {
  const { data, isLoading, isLoadMore, isLastPage, error } = useAppSelector(
    state => state.NotificationReducer
  )
  const [body, setBody] = useState<Body>({
    page: 1,
    limit: 15,
  })
  const Dispatch = useAppDispatch()
  var onEndReachedCalledDuringMomentum = true

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }
  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !isLastPage && !isLoadMore) {
      setBody({ ...body, page: body.page + 1 })
    }
    onEndReachedCalledDuringMomentum = true
  }
  const getData = () => {
    Dispatch(requestListNotificationThunk({ body, loadOnTop: false }))
    getCountNotRead()
  }

  const onRefreshData = () => {
    //  getCountNotification()
    setBody({ ...body, page: 1 })
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])

  const readAllNotification = async () => {
    const res = await requestReadAllNotification({})
    if (res?.code === API_STATUS.SUCCESS) {
      await Dispatch(readAllNotify())
    }
  }
  const getCountNotRead = async () => {
    const res = await requestCountNotification()
    if (res?.code === API_STATUS.SUCCESS) {
      await Dispatch(setCountNotify(res?.data?.notification_not_seen))
    }
  }
  const onNavigation = async (item: Item) => {
    if (item.NotificationPushes.length === 0) {
      Dispatch(readNotificationForId(item?.id))
      await requestReadNotification({ id: item.id })
    }

    switch (item?.type) {
      case NOTIFICATION_TYPE.DONATE:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_SUPPORT_MANAGE, {
          id: item?.notification_id,
          // customer: ROLE.CUSTOMER,
        })
        return
      case NOTIFICATION_TYPE.POST:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_POST, {
          id: item?.notification_id,
        })
        return
      case NOTIFICATION_TYPE.NEWS_BANNER:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.BANNER_DETAIL, {
          id_banner: item?.notification_id,
        })
        return
    }
  }

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }
  if (error) return <Error reload={getData} />
  return (
    <ScreenWrapper
      titleHeader={R.strings().notification}
      backgroundColor={colors.white}
      backgroundHeader={colors.white}
      color="black"
      forceInset={['left']}
      rightComponent={<RightComponent onPress={readAllNotification} />}
      borderBottomHeader={colors.border}
    >
      <View style={styles.ctn}>
        <FlatList
          onRefresh={onRefreshData}
          style={styles.flatlist}
          // ref={listRef}
          data={data}
          refreshing={isLoading}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.05}
          onMomentumScrollBegin={onMomentumScrollBegin}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          renderItem={({ item, index }) => (
            <ItemNotification
              item={item}
              index={index}
              onPress={() => {
                onNavigation(item)
              }}
            />
          )}
          keyExtractor={(_, index) => `${index}`}
          ListEmptyComponent={() => <Empty description={'Danh sách trống'} />}
        />
      </View>
    </ScreenWrapper>
  )
}

const ItemNotification = ({
  item,
  index,
  onPress,
}: {
  item: any
  index: number
  onPress: () => void
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.ctn_item,
        {
          backgroundColor:
            item.NotificationPushes.length !== 0 ? colors.white : '#FBE9E8',
        },
      ]}
      onPress={onPress}
      key={`${index}`}
    >
      <FstImage
        source={R.images.img_vietbuiltding_banner}
        style={styles.item_img}
      />
      <View style={styles.item_detail}>
        <Text style={styles.title} children={item?.title} />
        <Text
          style={styles.time}
          children={DateUtils.formatShortDate(item?.create_at)}
        />
      </View>
    </TouchableOpacity>
  )
}

export default NotificationScreen

const RightComponent = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.txt_read_notification} children={'Đọc tất cả'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  txt_read_notification: {
    ...fonts.regular14,
    color: colors.primary,
    marginTop: 3,
    marginRight: 2,
  },
  ctn: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  ctn_item: {
    ...styleView.rowItem,
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  item_img: {
    width: dimensions.width * 0.13,
    height: dimensions.width * 0.13,
    marginRight: 15,
    borderRadius: 10,
  },
  item_detail: {
    flex: 1,
  },
  title: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
    lineHeight: 25,
  },
  time: {
    marginTop: 10,
    ...fonts.regular14,
    color: colors.textColor.gray8,
    lineHeight: 22,
  },
})
