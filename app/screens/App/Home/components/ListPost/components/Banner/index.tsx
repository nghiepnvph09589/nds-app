import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'

import { Banners } from '../../../../model'
import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { colors } from '@app/theme'

const window = Dimensions.get('window')
const { width } = window
interface SlideBarProps {
  dataBanner: Banners[]
}
const Banner = (props: SlideBarProps) => {
  const { dataBanner } = props
  const renderItemBanner = useCallback(
    ({ item }: { item: Banners; index: number }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.BANNER_DETAIL)
          }}
          children={
            <FstImage
              source={item?.image_url}
              //source={{ uri: item?.image_url }}
              style={[styles.imgBanner]}
              resizeMode="cover"
            />
          }
        />
      )
    },
    []
  )

  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <View style={styles.container}>
      {!!dataBanner?.length && (
        <SwiperFlatList
          autoplay
          autoplayDelay={1}
          autoplayLoop
          index={0}
          showPagination
          keyExtractor={keyExtractor}
          data={dataBanner || []}
          renderItem={renderItemBanner}
          paginationActiveColor={colors.primary}
          paginationStyleItem={styles.item_pagination}
          paginationDefaultColor={'#D8D8D8'}
          paginationStyle={styles.v_pagination}
        />
      )}
    </View>
  )
}
export default Banner
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: 'white',
  },
  imgBanner: {
    width: width - 30,
    aspectRatio: 2.15625,
    borderRadius: 12,
    marginHorizontal: 15,
  },
  item_pagination: {
    width: 7,
    height: 7,
    marginRight: -5,
  },
  v_pagination: {
    paddingTop: 10,
  },
})
