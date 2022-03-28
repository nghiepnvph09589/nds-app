import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { DataBanner } from '../../mockup'
import { ListPostData } from '../../model'
import { getDataHome } from '../../slice/HomeSlice'
import Banner from './components/Banner'
import CategoryAndAddress from './components/CategoryAndAddress'
import ContentPost from './components/ContentPost'
import InfoPost from './components/InfoPost'
import PostImageArea from './components/PostImageArea'
import Support from './components/Support'

interface ListPostProps {
  data: ListPostData[]
}

const ListPost = (props: ListPostProps) => {
  const dispatch = useDispatch()
  const { data } = props
  const onRefreshData = () => {
    dispatch(getDataHome({ page: 1 }))
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
          time={item?.create_at}
        />
        <ContentPost id={item.id} title={item?.title} content={item.content} />
        {item?.DonateRequestMedia.length > 0 && (
          <PostImageArea data={item?.DonateRequestMedia} />
        )}

        <Support item={item} />
      </View>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Banner dataBanner={DataBanner} />
          <CategoryAndAddress />
        </>
      }
      contentContainerStyle={styles.v_list}
      onRefresh={onRefreshData}
      refreshing={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
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
})
