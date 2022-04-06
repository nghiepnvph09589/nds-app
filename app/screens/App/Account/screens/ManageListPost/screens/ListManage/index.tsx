import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fonts } from '@app/theme'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import {
  DEFAULT_PARAMS,
  SCREEN_ROUTER_APP,
  STATUS_TYPE,
} from '@app/constant/Constant'
import { useDispatch } from 'react-redux'
import { getDataListManagePost } from '../../slice/ManageListPostSlice'
import { useAppSelector } from '@app/store'
import Empty from '@app/components/Empty/Empty'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import Error from '@app/components/Error/Error'
import NavigationUtil from '@app/navigation/NavigationUtil'
import DateUtils from '@app/utils/DateUtils'

interface ListManageProps {
  status: number
  page: number
}

const ListManage = (props: ListManageProps) => {
  const { isLoading, isError, data, isLastPage, isLoadMore } = useAppSelector(
    state => state.manageListPostReducer
  )
  const dispatch = useDispatch()
  const { page, status } = props
  const [pageList, setPageList] = useState<number>(DEFAULT_PARAMS.PAGE)

  useEffect(() => {
    getData(DEFAULT_PARAMS.PAGE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // eslint-disable-next-line no-shadow
  const getData = (page: number) => {
    setPageList(page)
    const payload = {
      status: status,
      limit: DEFAULT_PARAMS.LIMIT,
      page: page,
    }
    dispatch(getDataListManagePost(payload))
  }

  const onRefreshData = () => {
    getData(DEFAULT_PARAMS.PAGE)
  }

  var onEndReachedCalledDuringMomentum = true

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !isLastPage && !isLoadMore) {
      getData(pageList + 1)
    }
  }

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_POST, {
              id: item.id,
              type: status,
              status: item.status,
              endDate: item.end_date,
              typeNavigate: 2,
            })
          }}
          style={styles.v_container}
        >
          <View style={styles.v_info}>
            <FstImage style={styles.icon} source={R.images.ic_user_info} />
            <View style={styles.v_name_phone}>
              <Text style={styles.txt_name}>{item?.name}</Text>
              <Text style={styles.phone}>{item?.phone}</Text>
            </View>
            {status === STATUS_TYPE.WAIT_CONFIRM && item.status === 2 && (
              <View style={styles.view}>
                <Text style={styles.text}>Huyện đã duyệt</Text>
              </View>
            )}
            {status === STATUS_TYPE.COMPLETE && (
              <View style={styles.view}>
                <Text style={styles.text}>Tỉnh đã duyệt</Text>
              </View>
            )}
          </View>
          <View style={styles.line} />
          <View style={styles.v_row}>
            <FstImage
              resizeMode="cover"
              style={styles.image}
              source={{ uri: item?.DonateRequestMedia[0]?.media_url }}
            />
            <View style={styles.v_post}>
              <Text
                numberOfLines={2}
                style={{ ...fonts.semi_bold16, color: colors.text }}
              >
                {item?.title}
              </Text>
              <Text style={styles.txt_date}>
                {DateUtils.formatShortDate(item?.create_at)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    },
    [status]
  )

  const keyExtractor = useCallback(item => `${item.id}`, [])

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  if (isError)
    return (
      <Error
        reload={() => {
          getData(DEFAULT_PARAMS.PAGE)
        }}
      />
    )
  return (
    <FlatList
      onRefresh={onRefreshData}
      refreshing={false}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: data?.length === 0 ? 'white' : colors.backgroundColor,
      }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onEndReached={handleLoadMore}
      ListFooterComponent={
        isLoadMore ? (
          <ActivityIndicator
            color={colors.colorDefault.placeHolder}
            style={styles.v_load_more}
          />
        ) : null
      }
      ListEmptyComponent={<Empty description={'Danh sách rỗng'} />}
    />
  )
}

export default ListManage

const styles = StyleSheet.create({
  v_info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 11,
    paddingBottom: 16,
  },
  v_container: {
    backgroundColor: 'white',
    marginTop: 8,
  },
  icon: {
    width: 39,
    height: 39,
  },
  v_name_phone: {
    marginLeft: 8,
    flex: 1,
  },
  txt_name: {
    ...fonts.regular14,
    color: colors.text,
    marginBottom: 8,
  },
  phone: {
    ...fonts.regular14,
    color: '#595959',
  },
  view: {
    borderRadius: 16,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
  },
  text: {
    ...fonts.regular14,
    color: colors.primary,
  },
  line: {
    height: 1,
    backgroundColor: colors.border,
  },
  v_row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 19,
    paddingBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  v_post: {
    marginLeft: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  v_load_more: {
    marginVertical: 15,
  },
  txt_date: {
    ...fonts.regular14,
    color: '#595959',
  },
})
