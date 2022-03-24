import Empty from '@app/components/Empty/Empty'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { DEFAULT_PARAMS } from '@app/constant/Constant'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import ContentPost from './components/ContentPost'
import InfoPost from './components/InfoPost'
import PostImageArea from './components/PostImageArea'
import Support from './components/Support'
import { ListPostData } from './model'
import { getDataListPost } from './slice/ListPostSlice'

const ListPost = () => {
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

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  const getData = () => {
    dispatch(getDataListPost(body))
  }
  const renderItem = useCallback(({ item }: { item: ListPostData }) => {
    return (
      <View style={styles.v_item}>
        <InfoPost
          avatar={
            item?.profile_picture_url
              ? item?.profile_picture_url.replace('http://', 'https://')
              : ''
          }
          name={item?.name}
          address={'Yên Hòa, Cầu Giấy, Hà Nội'}
        />
        <ContentPost title={item?.title} content={item.content} id={item.id} />
        {item?.DonateRequestMedia.length > 0 && (
          <PostImageArea data={item?.DonateRequestMedia} />
        )}
        <Support />
      </View>
    )
  }, [])
  const onRefreshData = () => {
    setBody({
      ...body,
      page: DEFAULT_PARAMS.PAGE,
    })
  }
  const keyExtractor = useCallback(item => `${item.id}`, [])
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

export default ListPost

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
