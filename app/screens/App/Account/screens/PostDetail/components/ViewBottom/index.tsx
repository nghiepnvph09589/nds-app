import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  ROLE,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
  STATUS_TYPE,
} from '@app/constant/Constant'
import { colors, dimensions, fonts } from '@app/theme'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'

import AsyncStorage from '@react-native-community/async-storage'
import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { showConfirm } from '@app/utils/AlertHelper'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

interface ViewBottomProps {
  type: number | undefined
  handleApprove: () => void
  openOption: () => void
  id: number
  status: number
  typeNavigate?: number
  is_update?: number
}

const ViewBottom = (props: ViewBottomProps) => {
  const userInfo = useAppSelector(state => state.accountReducer).data
  const { type, handleApprove, openOption, id, status, typeNavigate } = props
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
        id: id,
      })
    }
  }
  return (
    <>
      {type && type !== STATUS_TYPE.DENY && typeNavigate !== 1 ? (
        <View style={styles.v_button3}>
          <TouchableOpacity onPress={handleApprove} style={styles.v_button2}>
            <FstImage style={styles.icon} source={R.images.ic_approve} />
            <Text style={styles.text}>
              {type === STATUS_TYPE.COMPLETE
                ? 'Chỉnh sửa'
                : userInfo?.role === ROLE.OFFICER_DISTRICT && status === 2
                ? 'Chỉnh sửa'
                : userInfo?.role === ROLE.OFFICER_DISTRICT
                ? 'Yêu cầu phê duyệt'
                : 'Phê duyệt'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openOption}>
            <FstImage style={styles.img_option} source={R.images.ic_option} />
          </TouchableOpacity>
        </View>
      ) : type === STATUS_TYPE.EDIT && typeNavigate === 1 ? (
        <TouchableOpacity onPress={handleApprove} style={styles.v_button}>
          <Text style={styles.text}>{'Chỉnh sửa'}</Text>
        </TouchableOpacity>
      ) : !type && type !== 0 ? (
        <TouchableOpacity onPress={onSupport} style={styles.v_button}>
          <FstImage style={styles.icon} source={R.images.ic_heart} />
          <Text style={styles.text}>{R.strings().support}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  )
}

export default ViewBottom

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS !== 'ios' ? 20 : getBottomSpace(),
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.width - 30,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  v_button2: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // /width: dimensions.width - 30,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  text: {
    ...fonts.semi_bold16,
    color: 'white',
  },
  lineTab: {
    height: 2,
    backgroundColor: 'red',
  },
  txt_tab: {
    ...fonts.semi_bold15,
  },
  background: {
    backgroundColor: 'white',
  },
  v_button3: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS !== 'ios' ? 20 : isIphoneX() ? getBottomSpace() : 20,
    paddingHorizontal: 15,
  },
  img_option: {
    width: 77,
    height: 45,
    marginLeft: 12,
  },
})
