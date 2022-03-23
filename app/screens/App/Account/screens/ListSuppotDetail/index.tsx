import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { fonts, styleView } from '@app/theme'

import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme/colors'
import { formatPrice } from '@app/utils/Format'

const mockData = [
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: 'đã tham gia ủng hộ cho',
    money: 300000,
  },
]
const ListSupportDetailScreen = () => {
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
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Thông tin ủng hộ'}
      backgroundColor={colors.backgroundColor}
    >
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
    </ScreenWrapper>
  )
}
const _itemOrder = ({ item, index }: { item: any; index: number }) => {
  return (
    <View key={`${index}`} style={styles.ctn_item}>
      <FstImage source={item?.soure} style={styles.img_item} />
      <View style={styles.detail_item}>
        <Text children={item.name} style={styles.name} />
        <View style={{ ...styleView.rowItemBetween }}>
          <Text style={styles.content} children={item?.content} />
          <Text
            style={styles.money}
            children={formatPrice(item?.money) + ' đ'}
          />
        </View>
      </View>
    </View>
  )
}
export default ListSupportDetailScreen

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // width: '100%',
  },
  v_load_more: {
    marginTop: 5,
  },
  ctn_item: {
    padding: 15,
    ...styleView.rowItem,
    backgroundColor: colors.white,
    marginTop: 1,
  },
  img_item: {
    marginVertical: 5,
    marginRight: 15,
    width: 45,
    height: 45,
    borderRadius: 22,
  },
  detail_item: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray9,
  },
  content: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
  },
  money: {
    ...fonts.semi_bold16,
    color: colors.primary,
  },
})
