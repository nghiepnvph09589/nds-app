import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme'
import { ListPostData } from './model'
import InfoPost from './components/InfoPost'
import ContentPost from './components/ContentPost'
import PostImageArea from './components/PostImageArea'
import Support from './components/Support'
import { useAppSelector } from '@app/store'

const ListPost = () => {
  const { data } = useAppSelector(state => state.homeReducer)
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
        <ContentPost title={item?.title} content={item.content} />
        {item?.DonateRequestMedia.length > 0 && (
          <PostImageArea data={item?.DonateRequestMedia} />
        )}

        <Support />
      </View>
    )
  }, [])
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
        onRefresh={() => {}}
        refreshing={false}
        data={data.listPost}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
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
})
