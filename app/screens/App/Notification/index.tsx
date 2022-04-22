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
import {
  clearNotifyCount,
  readAllNotify,
  readNotificationForId,
  requestListNotificationThunk,
  setCountNotify,
} from './slice'
import { colors, dimensions, fonts, styleView } from '@app/theme'
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
import RenderHTML from 'react-native-render-html'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { WaveIndicator } from 'react-native-indicators'

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
  }

  const onRefreshData = () => {
    getCountNotRead()
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
      await Dispatch(clearNotifyCount())
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
      await getCountNotRead()
    }

    switch (item?.type) {
      case NOTIFICATION_TYPE.DONATE:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_SUPPORT_MANAGE, {
          id: item?.notification_id,
          onRefreshData: getCountNotRead,
        })
        return
      case NOTIFICATION_TYPE.POST:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_POST, {
          id: item?.notification_id,
          typeNavigate: 3,
        })
        return
      case NOTIFICATION_TYPE.NEWS_BANNER:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.BANNER_DETAIL, {
          id_banner: item?.notification_id,
        })
        return
    }
  }
  const countNotify = useAppSelector(
    state => state.NotificationReducer.countNotification
  )
  if (isLoading) return <Loading />
  if (error) return <Error reload={getData} />
  return (
    <ScreenWrapper
      titleHeader={R.strings().notification}
      backgroundColor={colors.white}
      backgroundHeader={colors.white}
      color="black"
      forceInset={['left']}
      rightComponent={
        countNotify ? (
          <RightComponent
            onPress={readAllNotification}
            countNotify={countNotify}
          />
        ) : (
          <></>
        )
      }
      borderBottomHeader={colors.border}
    >
      <View style={styles.ctn}>
        <FlatList
          onRefresh={onRefreshData}
          style={styles.flatlist}
          data={data}
          refreshing={isLoading}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
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
        {/* <Loading /> */}
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
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor:
            item.NotificationPushes.length !== 0 ? colors.white : '#FBE9E8',
        },
      ]}
      onPress={onPress}
      key={`${index}`}
    >
      <FstImage source={R.images.img_avatar3} style={styles.item_img} />
      <View style={styles.item_detail}>
        <View style={{ ...styleView.rowItem }}>
          <Text numberOfLines={1} style={styles.title} children={item?.title} />
          <View style={{ ...styleView.rowItem }}>
            <FstImage style={styles.ic_clock} source={R.images.ic_clock} />
            <Text
              style={styles.time}
              children={DateUtils.formatShortDate(item?.create_at)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NotificationScreen

const RightComponent = ({
  onPress,
  countNotify,
}: {
  onPress: () => void
  countNotify: number
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={styles.txt_read_notification}
        children={`Đọc tất cả (${countNotify})`}
      />
    </TouchableOpacity>
  )
}

const Loading = () => {
  return (
    <View style={styles.ctn_loading}>
      <View style={styles.loading}>
        <WaveIndicator
          color={colors.primary}
          count={3}
          size={dimensions.width * 0.13}
        />
      </View>
    </View>
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
    flex: 1,
  },
  time: {
    ...fonts.regular14,
    color: colors.textColor.gray8,
    lineHeight: 22,
  },
  ic_clock: { width: 25, height: 25, marginRight: 5 },
  ctn_loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  loading: {
    backgroundColor: 'white',
    width: '20%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.width * 0.3,
  },
})
