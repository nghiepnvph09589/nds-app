import { API_STATUS, ROLE, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts, styleView } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import DateUtils from '@app/utils/DateUtils'
import Empty from '@app/components/Empty/Empty'
import Error from '@app/components/Error/Error'
import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors } from '@app/theme/colors'
import { getListSupported } from '../api'

const ListSupportedComponent = ({ status }: { status: number }) => {
  var onEndReachedCalledDuringMomentum = true
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }
  // eslint-disable-next-line no-shadow
  const getData = async (page: number) => {
    setPage(page)
    const payload = {
      status: status,
      page: page,
      limit: 10,
    }
    if (page === 1) {
      showLoading()
    } else {
      setLoadMore(true)
    }
    try {
      const res = await getListSupported(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        if (!res.data?.Donates?.length && page > 1) {
          setLastPage(true)
          return
        }
        if (page > 1) {
          setData(data.concat(res.data?.Donates))
        } else if (page === 1) {
          setData(res.data?.Donates)
        }
        setError(false)
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      hideLoading()
      setLoadMore(false)
    }
  }
  const onRefreshData = () => {
    setLastPage(false)
    getData(1)
  }
  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !lastPage && !loadMore) {
      getData(page + 1)
    }
    onEndReachedCalledDuringMomentum = true
  }
  useEffect(() => {
    getData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <View style={styles.container}>
      {error ? (
        <Error reload={onRefreshData} />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={{}}
          refreshing={false}
          // onRefresh={onRefreshData}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefreshData} />
          }
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onEndReached={handleLoadMore}
          data={data}
          keyExtractor={(_, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ItemSupport
              item={item}
              index={index}
              onRefreshData={onRefreshData}
            />
          )}
          ListFooterComponent={
            loadMore ? (
              <ActivityIndicator
                color={colors.primary}
                style={styles.v_load_more}
              />
            ) : null
          }
          ListEmptyComponent={<Empty description={'Danh sách trống'} />}
        />
      )}
    </View>
  )
}
export default ListSupportedComponent
const ItemSupport = ({
  item,
  index,
  onRefreshData,
}: {
  item: any
  index: number
  onRefreshData: () => void
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_SUPPORT_MANAGE, {
          id: item?.id,
          onRefreshData: onRefreshData,
          customer: ROLE.CUSTOMER,
        })
      }}
      key={`${index}`}
      style={styles.ctn_item}
    >
      <FstImage
        source={{ uri: item?.DonateRequest?.DonateRequestMedia[0]?.media_url }}
        style={styles.img_item}
      />
      <View style={styles.detail_item}>
        <Text style={styles.content}>
          {item?.name}{' '}
          <Text
            style={styles.txt_item_default}
            children={'đã yêu cầu ủng hộ cho bài viết '}
          />
          {item?.DonateRequest?.title}
        </Text>
        <Text
          style={styles.create_at}
          children={DateUtils.formatShortDate(item?.create_at)}
        />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: colors.white,
    // width: '100%',
  },
  v_load_more: {
    marginTop: 5,
  },
  ctn_item: {
    padding: 15,
    ...styleView.rowItem,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  img_item: {
    marginRight: 15,
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  detail_item: {
    flex: 1,
  },
  content: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray9,
    minHeight: 65,
    lineHeight: 25,
  },
  create_at: {
    ...fonts.regular16,
    color: colors.textColor.gray8,
  },
  txt_item_default: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
  },
})
