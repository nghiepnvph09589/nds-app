import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { ROLE } from '@app/constant/Constant'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'

interface ViewBottomProps {
  handleApprove: () => void
  openOption: () => void
  is_update: number
  status: number
}

const ViewBottom2 = (props: ViewBottomProps) => {
  const userInfo = useAppSelector(state => state.accountReducer).data
  const { handleApprove, openOption, is_update, status } = props

  return (
    <>
      {(is_update === 1 || is_update === 2) &&
      (userInfo.role === ROLE.CUSTOMER ||
        userInfo.role === ROLE.OFFICER_WARD) ? (
        <TouchableOpacity onPress={handleApprove} style={styles.v_button}>
          <Text style={styles.text}>{'Chỉnh sửa'}</Text>
        </TouchableOpacity>
      ) : userInfo.role === ROLE.OFFICER_DISTRICT && status === 0 ? (
        <></>
      ) : userInfo.role === ROLE.OFFICER_DISTRICT && is_update === 2 ? (
        <TouchableOpacity onPress={handleApprove} style={styles.v_button}>
          <Text style={styles.text}>{'Từ chối'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.v_button3}>
          <TouchableOpacity onPress={handleApprove} style={styles.v_button2}>
            <FstImage style={styles.icon} source={R.images.ic_approve} />
            <Text style={styles.text}>
              {userInfo?.role === ROLE.OFFICER_PROVINCE &&
              (status === 3 || is_update === 1 || is_update === 2)
                ? 'Chỉnh sửa'
                : userInfo?.role === ROLE.OFFICER_PROVINCE && status === 3
                ? 'Phê duyệt'
                : 'Yêu cầu phê duyệt'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openOption}>
            <FstImage style={styles.img_option} source={R.images.ic_option} />
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}

export default ViewBottom2

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
