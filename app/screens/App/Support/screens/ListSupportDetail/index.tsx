import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { fonts, styleView } from '@app/theme'

import DateUtils from '@app/utils/DateUtils'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme/colors'

const mockData = [
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
  {
    id: 1,
    soure: R.images.img_post,
    name: 'Nguyễn Minh Quang',
    content: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
    money: 300000,
    create_at: '2022-03-23T06:50:00.000Z',
  },
]
interface Props {
  route: { params: { id: number } }
}
const ListSupportDetailScreen = (props: Props) => {
  console.log(props.route?.params?.id)
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
    </ScreenWrapper>
  )
}
const _itemOrder = ({ item, index }: { item: any; index: number }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.SUPPORT_DETAIL)
      }}
      key={`${index}`}
      style={styles.ctn_item}
    >
      <FstImage source={item?.soure} style={styles.img_item} />
      <View style={styles.detail_item}>
        <Text children={item.content} style={styles.content} />
        <Text
          style={styles.create_at}
          children={DateUtils.formatShortDate(item?.create_at)}
        />
      </View>
    </TouchableOpacity>
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
    marginRight: 15,
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  detail_item: {
    flex: 1,
  },
  content: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
    minHeight: 65,
    lineHeight: 25,
  },
  create_at: {
    ...fonts.regular16,
    color: colors.textColor.gray8,
  },
})
