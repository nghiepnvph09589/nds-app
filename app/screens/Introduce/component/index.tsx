import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'

import AsyncStorage from '@react-native-community/async-storage'
import FstImage from '@app/components/FstImage'
import React from 'react'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { useDispatch } from 'react-redux'

const ComponentIntroduce = ({
  onNext,
  item,
  index,
}: {
  onNext: () => void
  item: any
  index: number
}) => {
  const dispatch = useDispatch()
  const onStart = async () => {
    await AsyncStorage.setItem('firstly', '1')
    dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
  }
  return (
    // <View style={styles.v_container} key={`${index}`}>
    //   <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
    //   <View style={styles.body}>
    //     <FstImage
    //       source={item.img}
    //       style={{
    //         marginTop: dimensions.height * 0.17,
    //         width: dimensions.width - 40,
    //         height: dimensions.width - 40,
    //       }}
    //     />
    //     <View style={styles.v_content}>
    //       <Text style={styles.title} children={item.title} />
    //       <Text style={styles.content} children={item.content} />
    //     </View>
    //     <TouchableOpacity onPress={onStart} style={styles.btn_skip}>
    //       <Text style={styles.txt_skip} children={'Bỏ qua'} />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.v_bottom}>
    //     <TouchableOpacity onPress={onNext} style={styles.btn_next}>
    //       <Text
    //         style={styles.txt_next}
    //         children={index === 2 ? 'Bắt đầu' : 'Tiếp theo'}
    //       />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View style={styles.body}>
      <FstImage
        source={item.img}
        style={{
          marginTop: dimensions.height * 0.17,
          width: dimensions.width - 40,
          height: dimensions.width - 40,
        }}
      />
      <View style={styles.v_content}>
        <Text style={styles.title} children={item.title} />
        <Text style={styles.content} children={item.content} />
      </View>
    </View>
  )
}

export default ComponentIntroduce

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: dimensions.width,
  },
  v_container: {
    width: dimensions.width,
    flex: 1,
    backgroundColor: colors.white,
  },
  btn_skip: {
    position: 'absolute',
    top: Platform.OS !== 'ios' ? 50 : getStatusBarHeight() + 30,
    right: 20,
  },
  v_bottom: {
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? (isIphoneX() ? 30 : 15) : 15,
  },
  btn_next: {
    paddingHorizontal: 62,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 19,
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  v_dots: {
    ...styleView.rowItemBetween,
    width: 42,
    marginTop: 40,
  },
  txt_next: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray1,
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
    marginTop: dimensions.height * 0.035,
  },
  title: {
    ...fonts.semi_bold24,
    color: colors.textColor.gray9,
  },
})
