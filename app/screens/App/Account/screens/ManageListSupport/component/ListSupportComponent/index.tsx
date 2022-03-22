import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'

const mockData = [
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
  },
]
const ListSupportComponent = () => {
  var onEndReachedCalledDuringMomentum = true
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }
  const getData = () => {}
  const onRefreshData = () => {
    getData()
  }
  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !lastPage && !loadMore) {
      getData()
    }
    onEndReachedCalledDuringMomentum = true
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        refreshing={false}
        onRefresh={onRefreshData}
        onEndReachedThreshold={0.05}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onEndReached={handleLoadMore}
        data={mockData}
        keyExtractor={(_, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={_itemOrder}
        // ListFooterComponent={
        //   loadMore ? (
        //     <ActivityIndicator
        //       color={colors.primary}
        //       style={styles.v_load_more}
        //     />
        //   ) : null
        // }
        ListEmptyComponent={<Empty description={'Danh sách trống'} />}
      />
    </View>
  )
}

export default ListSupportComponent
const _itemOrder = ({ item, index }: { item: any; index: number }) => {
  return (
    <View key={`${index}`} style={styles.ctn_item}>
      <FstImage source={item?.soure} style={styles.img_item} />
      <Text style={styles.txt_name}>
        {item.name} <Text style={styles.txt_content} children={item?.content} />
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  img_item: {
    marginHorizontal: 15,
    width: 45,
    height: 45,
    borderRadius: 22,
  },
  ctn_item: {
    padding: 15,
    ...styleView.rowItem,
    backgroundColor: colors.white,
    marginTop: 1,
  },
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  list: {
    flex: 1,
    // width: '100%',
  },
  v_load_more: {
    marginTop: 5,
  },
  txt_name: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray9,
    maxWidth: dimensions.width - 105,
    lineHeight: 24,
  },
  txt_content: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
    lineHeight: 24,
  },
})
