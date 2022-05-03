import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { colors, dimensions, fonts } from '@app/theme'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'

import AsyncStorage from '@react-native-community/async-storage'
import ComponentIntroduce from './component'
import R from '@app/assets/R'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { useDispatch } from 'react-redux'

const IntroduceScreen1 = () => {
  const keyExtractor = useCallback(item => `${item.id}`, [])
  const refIndex = useRef<any>()
  const [index, setIndex] = useState<number>(0)
  const dispatch = useDispatch()
  const introduceData = [
    {
      id: 0,
      img: R.images.img_introduce1,
      title: 'Cộng đồng',
      content: 'Phát triển cộng đồng chuyên sâu về thiện nguyện tại Lào Cai.',
    },
    {
      id: 1,
      img: R.images.img_introduce2,
      title: 'Kết nối',
      content: 'Kết nối các hoàn cảnh khó khăn tới những nhà hảo tâm',
    },
    {
      id: 2,
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
    <View style={styles.v_container}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <View style={{ flex: 1 }}>
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
          onChangeIndex={index => {
            setIndex(index.index)
          }}
        />
      </View>
      <View style={styles.v_content}>
        <Text style={styles.title} children={introduceData[index].title} />
        <Text style={styles.content} children={introduceData[index].content} />
      </View>
      <View style={styles.v_bottom}>
        <TouchableOpacity
          onPress={() => {
            index < 2 ? upButtonHandler(index) : onStart()
          }}
          style={styles.btn_next}
        >
          <Text
            style={styles.txt_next}
            children={index === 2 ? 'Bắt đầu' : 'Tiếp theo'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onStart} style={styles.btn_skip}>
        <Text style={styles.txt_skip} children={'Bỏ qua'} />
      </TouchableOpacity>
    </View>
  )
}

export default IntroduceScreen1

const styles = StyleSheet.create({
  item_pagination: {
    width: 7,
    height: 7,
    marginRight: -5,
  },
  v_pagination: {},
  v_container: {
    width: dimensions.width,
    flex: 1,
    backgroundColor: colors.white,
  },
  btn_next: {
    paddingHorizontal: 62,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  v_bottom: {
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? (isIphoneX() ? 45 : 15) : 15,
  },
  txt_next: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray1,
  },
  btn_skip: {
    position: 'absolute',
    top: Platform.OS !== 'ios' ? 50 : getStatusBarHeight() + 30,
    right: 20,
  },
  txt_skip: {
    ...fonts.semi_bold16,
    color: colors.primary,
  },
  content: {
    marginTop: dimensions.height * 0.033,
    ...fonts.regular18,
    color: colors.textColor.gray9,
    marginHorizontal: 20,
    textAlign: 'center',
    lineHeight: 27,
  },
  v_content: {
    alignItems: 'center',
    marginBottom: dimensions.height * 0.11,
  },
  title: {
    ...fonts.semi_bold24,
    color: colors.textColor.gray9,
  },
})
