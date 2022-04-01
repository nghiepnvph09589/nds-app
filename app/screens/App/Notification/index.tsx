import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import DateUtils from '@app/utils/DateUtils'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'

const data = [
  {
    title:
      'Bạn đã ủng hộ cho tin đăng Cùng em học trực tuyến - Nâng niu triệu ước mơ học vấn không gián đoạn',
    create_at: '2022-03-31T04:31:59.000Z',
  },
  {
    title: 'Lá Lành đùm là rách',
    create_at: '2022-03-31T04:31:59.000Z',
  },
  {
    title: 'Bài viết của bạn đã được phê duyệt',
    create_at: '2022-03-31T04:31:59.000Z',
  },
  {
    title:
      'Bạn đã ủng hộ cho tin đăng Cùng em học trực tuyến - Nâng niu triệu ước mơ học vấn không gián đoạn',
    create_at: '2022-03-31T04:31:59.000Z',
  },
  {
    title: 'Lá Lành đùm là rách',
    create_at: '2022-03-31T04:31:59.000Z',
  },
  {
    title: 'Bài viết của bạn đã được phê duyệt',
    create_at: '2022-03-31T04:31:59.000Z',
  },
]

const NotificationScreen = () => {
  var onEndReachedCalledDuringMomentum = true

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }
  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
    }
    onEndReachedCalledDuringMomentum = true
  }
  return (
    <ScreenWrapper
      titleHeader={R.strings().notification}
      backgroundColor={colors.white}
      backgroundHeader={colors.white}
      color="black"
      forceInset={['left']}
      rightComponent={<RightComponent onPress={() => {}} />}
      borderBottomHeader={colors.border}
    >
      <View style={styles.ctn}>
        <FlatList
          style={styles.flatlist}
          // ref={listRef}
          data={data}
          // refreshing={isLoading}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.05}
          onMomentumScrollBegin={onMomentumScrollBegin}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          renderItem={({ item, index }) => (
            <ItemNotification item={item} index={index} onPress={() => {}} />
          )}
          keyExtractor={(_, index) => `${index}`}
          ListEmptyComponent={() => <Empty description={'Danh sách trống'} />}
        />
      </View>
    </ScreenWrapper>
  )
}

const ItemNotification = ({
  item,
  index,
  onPress,
}: {
  item: any
  index: number
  onPress: () => void
}) => {
  return (
    <TouchableOpacity
      style={styles.ctn_item}
      onPress={onPress}
      key={`${index}`}
    >
      <FstImage
        source={R.images.img_vietbuiltding_banner}
        style={styles.item_img}
      />
      <View style={styles.item_detail}>
        <Text style={styles.title} children={item?.title} />
        <Text
          style={styles.time}
          children={DateUtils.formatShortDate(item?.create_at)}
        />
      </View>
    </TouchableOpacity>
  )
}

export default NotificationScreen

const RightComponent = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.txt_read_notification} children={'Đọc tất cả'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  txt_read_notification: {
    ...fonts.regular14,
    color: colors.primary,
    marginTop: 3,
    marginRight: 2,
  },
  ctn: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  ctn_item: {
    ...styleView.rowItem,
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  item_img: {
    width: dimensions.width * 0.13,
    height: dimensions.width * 0.13,
    marginRight: 15,
    borderRadius: 10,
  },
  item_detail: {
    flex: 1,
  },
  title: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
    lineHeight: 25,
  },
  time: {
    marginTop: 10,
    ...fonts.regular14,
    color: colors.textColor.gray8,
    lineHeight: 22,
  },
})
