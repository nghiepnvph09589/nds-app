import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '@app/theme'

import AsyncStorage from '@react-native-community/async-storage'
import FstImage from '@app/components/FstImage'
import { ListPostData } from '@app/screens/App/Home/model'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { showConfirm } from '@app/utils/AlertHelper'
import { useDispatch } from 'react-redux'

const Support = ({ item }: { item: ListPostData }) => {
  const dispatch = useDispatch()
  const onSupport = async () => {
    const token = await AsyncStorage.getItem('token')
    if (!token) {
      showConfirm(R.strings().notification, R.strings().please_login, () => {
        dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
      })
      return
    } else {
      NavigationUtil.navigate(SCREEN_ROUTER_APP.CREATE_SUPPORT, {
        id: item?.id,
      })
    }
  }
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_SUPPORT_DETAIL, {
          id: item?.id,
        })
      }}
      style={styles.v_container}
    >
      <FstImage
        resizeMode="contain"
        style={styles.icon}
        source={R.images.ic_love}
      />
      <Text style={styles.txt_support}>{R.strings().number_support}</Text>
      <Text style={styles.txt_number}>{item?.Donates?.length}</Text>
      <TouchableOpacity
        onPress={() => {
          onSupport()
        }}
        style={styles.button}
      >
        <FstImage
          resizeMode="contain"
          style={styles.icon}
          source={R.images.ic_love2}
        />
        <Text style={styles.text}>{R.strings().support}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default Support

const styles = StyleSheet.create({
  v_container: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  txt_support: {
    marginLeft: 8,
    ...fonts.regular16,
    color: '#595959',
  },
  txt_number: {
    marginLeft: 12,
    ...fonts.regular16,
    color: colors.text,
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    marginLeft: 8,
    ...fonts.semi_bold16,
    color: 'white',
  },
})
