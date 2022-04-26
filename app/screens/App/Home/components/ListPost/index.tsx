import { API_STATUS, DEFAULT_PARAMS } from '@app/constant/Constant'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import Banner from './components/Banner'
import CategoryAndAddress from './components/CategoryAndAddress'
import ContentPost from './components/ContentPost'
import Empty from '@app/components/Empty/Empty'
import Error from '@app/components/Error/Error'
import HomeApi from '../../api/HomeApi'
import InfoPost from './components/InfoPost'
import { ListPostData } from '../../model'
import PostImageArea from './components/PostImageArea'
import Support from './components/Support'
import { colors } from '@app/theme'
import { getDataHome } from '../../slice/HomeSlice'
import { getDataUserInfo } from '@app/screens/App/Account/slices/AccountSlice'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

const ListPost = () => {
  const { isLoading, isError, data, isLastPage, isLoadMore } = useAppSelector(
    state => state.homeReducer
  )
  const [body, setBody] = useState({
    page: DEFAULT_PARAMS.PAGE,
    limit: DEFAULT_PARAMS.LIMIT,
  })
  const [dataBanner, setDataBanner] = useState<any[]>()
  const dispatch = useDispatch()
  const getDataBanner = async () => {
    const res = await HomeApi.getListBanner()
    if (res?.code === API_STATUS.SUCCESS) setDataBanner(res?.data)
  }
  useEffect(() => {
    getHome()
    getDataBanner()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])

  const getHome = () => {
    dispatch(getDataHome(body))
  }

  const getDataUser = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      dispatch(getDataUserInfo())
    }
  }

  var onEndReachedCalledDuringMomentum = true

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !isLastPage && !isLoadMore) {
      setBody({
        ...body,
        page: body.page + 1,
      })
    }
  }

  const onRefreshData = () => {
    setBody({
      ...body,
      page: DEFAULT_PARAMS.PAGE,
    })
  }

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  if (isError)
    return (
      <Error
        reload={() => {
          getHome()
          getDataUser()
        }}
      />
    )

  const renderItem = ({ item }: { item: ListPostData }) => {
    return (
      <View style={styles.v_item}>
        <InfoPost
          avatar={
            item?.User?.profile_picture_path
              ? item?.User.profile_picture_url.replace('http://', 'https://')
              : ''
          }
          name={item?.User?.name}
          address={`${item?.DFWard?.name}, ${item?.DFDistrict?.name}, ${item?.DFProvince?.name}`}
          time={item?.create_at}
        />
        <ContentPost id={item.id} title={item?.title} content={item.content} />
        {item?.DonateRequestMedia.length > 0 && (
          <PostImageArea data={item?.DonateRequestMedia} />
        )}

        <Support item={item} />
      </View>
    )
  }
  const keyExtractor = (item: ListPostData) => `${item.id}`
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Banner dataBanner={dataBanner} />
          {/* <CategoryAndAddress /> */}
        </>
      }
      contentContainerStyle={styles.v_list}
      onRefresh={onRefreshData}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor:
          data?.listPost.length === 0 ? 'white' : colors.backgroundColor,
      }}
      refreshing={false}
      data={data?.listPost}
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

export default ListPost

const styles = StyleSheet.create({
  v_item: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingTop: 18,
    paddingBottom: 12,
    //paddingHorizontal: 15,
  },
  v_list: {
    paddingBottom: 20,
  },
  v_load_more: {
    marginVertical: 15,
  },
})
