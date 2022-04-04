import Empty from '@app/components/Empty/Empty'
import Error from '@app/components/Error/Error'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { DEFAULT_PARAMS } from '@app/constant/Constant'
import ContentPost from '@app/screens/App/Home/components/ListPost/components/ContentPost'
import InfoPost from '@app/screens/App/Home/components/ListPost/components/InfoPost'
import PostImageArea from '@app/screens/App/Home/components/ListPost/components/PostImageArea'
import Support from '@app/screens/App/Home/components/ListPost/components/Support'
import { ListPostData } from '@app/screens/App/Home/model'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getDataListPost } from './slice/ListPostSlice'

const ListPostUser = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, data, isLastPage, isLoadMore } = useAppSelector(
    state => state.listPostReducer
  )
  const [body, setBody] = useState({
    page: DEFAULT_PARAMS.PAGE,
    limit: DEFAULT_PARAMS.LIMIT,
  })
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])

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

  const getData = () => {
    dispatch(getDataListPost(body))
  }
  if (isError) return <Error reload={getData} />

  const onRefreshData = () => {
    setBody({
      ...body,
      page: DEFAULT_PARAMS.PAGE,
    })
  }

  const renderItem = ({ item }: { item: ListPostData }) => {
    return (
      <View style={styles.v_item}>
        <InfoPost
          time={item?.create_at}
          avatar={
            item?.profile_picture_path
              ? item?.profile_picture_url.replace('http://', 'https://')
              : ''
          }
          name={item?.name}
          address={`${item?.DFWard?.name}, ${item?.DFDistrict?.name}, ${item?.DFProvince?.name}`}
        />
        <ContentPost title={item?.title} content={item.content} id={item.id} />
        {item?.DonateRequestMedia.length > 0 && (
          <PostImageArea data={item?.DonateRequestMedia} />
        )}
        <Support item={item} />
      </View>
    )
  }

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  const keyExtractor = (item: ListPostData) => `${item.id}`

  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Danh sách tin đăng'}
      backgroundColor={colors.backgroundColor}
    >
      <FlatList
        contentContainerStyle={styles.v_list}
        onRefresh={onRefreshData}
        refreshing={false}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor:
            data?.listPost?.length === 0 ? 'white' : colors.backgroundColor,
        }}
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
    </ScreenWrapper>
  )
}

export default ListPostUser

const styles = StyleSheet.create({
  v_item: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingTop: 18,
    paddingBottom: 12,
  },
  v_list: {
    paddingBottom: 20,
  },
  v_load_more: {
    marginVertical: 15,
  },
})
