import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React from 'react'
import { ROLE, STATUS_TYPE } from '@app/constant/Constant'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import { colors, dimensions, fonts } from '@app/theme'
import { useAppSelector } from '@app/store'

interface ViewBottomProps {
  type: number
  handleApprove: () => void
}

const ViewBottom = (props: ViewBottomProps) => {
  const userInfo = useAppSelector(state => state.accountReducer).data
  const { type, handleApprove } = props
  return (
    <>
      {type && type !== STATUS_TYPE.COMPLETE ? (
        <View style={styles.v_button3}>
          <TouchableOpacity onPress={handleApprove} style={styles.v_button2}>
            <FstImage style={styles.icon} source={R.images.ic_approve} />
            <Text style={styles.text}>
              {userInfo?.role === ROLE.OFFICER_DISTRICT
                ? ' Yêu cầu phê duyệt'
                : 'Phê duyệt'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FstImage style={styles.img_option} source={R.images.ic_option} />
          </TouchableOpacity>
          {/* <FstImage style={styles.icon} source={R.images.ic_heart} />
         <Text style={styles.text}>{R.strings().support}</Text> */}
        </View>
      ) : !type ? (
        <TouchableOpacity style={styles.v_button}>
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
