import React, { useCallback, useRef } from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import ComponentIntroduce from './component'
import R from '@app/assets/R'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import { StyleSheet } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { colors } from '@app/theme'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { useDispatch } from 'react-redux'

const IntroduceScreen1 = () => {
  const keyExtractor = useCallback(item => `${item.id}`, [])
  const refIndex = useRef<any>()
  const dispatch = useDispatch()
  const introduceData = [
    {
      id: 1,
      img: R.images.img_introduce1,
      title: 'Cộng đồng',
      content: 'Phát triển cộng đồng chuyên sâu về thiện nguyện tại Lào Cai.',
    },
    {
      id: 2,
      img: R.images.img_introduce2,
      title: 'Kết nối',
      content: 'Kết nối các hoàn cảnh khó khăn tới những nhà hảo tâm',
    },
    {
      id: 3,
      img: R.images.img_introduce3,
      title: 'Chia sẻ',
      content: 'Chia sẻ, ủng hộ, giúp đỡ những mảnh đời có hoàn cảnh khó khăn',
    },
  ]
  const upButtonHandler = (index: number) => {
    refIndex.current?.scrollToIndex({
      index: index + 1,
      animated: true,
    })
  }
  const onStart = async () => {
    await AsyncStorage.setItem('firstly', '1')
    dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
  }
  return (
    <SwiperFlatList
      ref={refIndex}
      autoplay={false}
      index={0}
      showPagination
      keyExtractor={keyExtractor}
      data={introduceData}
      renderItem={({ item, index }) => (
        <ComponentIntroduce
          item={item}
          onNext={() => {
            index < 2 ? upButtonHandler(index) : onStart()
          }}
          index={index}
        />
      )}
      paginationActiveColor={colors.primary}
      paginationStyleItem={styles.item_pagination}
      paginationDefaultColor={'#D8D8D8'}
      paginationStyle={styles.v_pagination}
    />
  )
}

export default IntroduceScreen1

const styles = StyleSheet.create({
  item_pagination: {
    width: 7,
    height: 7,
    marginRight: -5,
  },
  v_pagination: {
    paddingTop: 10,
  },
})
