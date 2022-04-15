import { ROLE, STATUS_SUPPORT_DETAIL } from '@app/constant/Constant'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import { Source } from 'react-native-fast-image'
import { useAppSelector } from '@app/store'

const ModalOption = ({
  cancel,
  cancelSupport,
  onEdit,
  requestEdit,
  status,
  data,
}: {
  cancelSupport: () => void
  cancel: () => void
  onEdit: () => void
  requestEdit: () => void
  status?: number
  data?: dataSupportDetail
}) => {
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const checkBtnCancelSupport = () => {
    if (
      userInfo.role === ROLE.OFFICER_PROVINCE &&
      (status === STATUS_SUPPORT_DETAIL.CUSTOMER_SUPPORT ||
        status === STATUS_SUPPORT_DETAIL.DISTRICT_ACCEPT)
    ) {
      return 1
    } else {
      return 0
    }
  }

  const checkBtnEdit = () => {
    if (userInfo.role === ROLE.OFFICER_DISTRICT) {
      if (status === 1 || status === 2 || data?.is_update === 1) {
        return 1
      } else {
        return 0
      }
    } else if (userInfo.role === ROLE.OFFICER_PROVINCE) {
      if (status === 1 || status === 2 || status === 3) {
        return 1
      } else {
        return 0
      }
    }
  }

  const checkBtnRequestEdit = () => {
    if (userInfo.role === ROLE.OFFICER_PROVINCE) {
      if ((status === 1 || status === 2) && data?.is_update === 0) {
        return 1
      } else {
        return 0
      }
    } else if (userInfo.role === ROLE.OFFICER_DISTRICT) {
      if (status === 1 && data?.is_update === 0) {
        return 1
      } else {
        return 0
      }
    }
  }
  return (
    <View style={styles.v_ctn_modal}>
      <View style={styles.v_option}>
        {checkBtnEdit() === 1 && (
          <RowBtn
            onPress={onEdit}
            source={R.images.ic_edit_support}
            name={'Chỉnh sửa'}
            line
          />
        )}
        {/* {checkBtnRequestEdit() === 1 && (
          <RowBtn
            onPress={requestEdit}
            source={R.images.ic_request_edit_support}
            name={'Yêu cầu chỉnh sửa'}
            line
          />
        )} */}
        {checkBtnCancelSupport() === 1 && (
          <RowBtn
            onPress={cancelSupport}
            source={R.images.ic_cancel_support}
            name={'Xóa'}
          />
        )}
      </View>
      <TouchableOpacity onPress={cancel} style={styles.btn_cancel}>
        <Text
          style={{ ...fonts.semi_bold20, color: colors.textColor.gray7 }}
          children={'Hủy'}
        />
      </TouchableOpacity>
    </View>
  )
}

const RowBtn = ({
  onPress,
  name,
  source,
  line,
}: {
  onPress: () => void
  name: string
  source: Source
  line?: boolean
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.ctn_row_btn,
        // eslint-disable-next-line react-native/no-inline-styles
        line && { borderBottomWidth: 1, borderColor: colors.border },
      ]}
    >
      <FstImage source={source} style={styles.ic_btn} />
      <Text style={styles.title_btn} children={name} />
    </TouchableOpacity>
  )
}

export default ModalOption

const styles = StyleSheet.create({
  v_ctn_modal: {
    position: 'absolute',
    bottom: 15,
    width: dimensions.width - 40,
  },
  v_option: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    borderRadius: 14,
  },
  btn_cancel: {
    backgroundColor: colors.white,
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 14,
  },
  ctn_row_btn: {
    ...styleView.rowItem,
    paddingVertical: 17,
    alignItems: 'center',
  },
  ic_btn: {
    width: 25,
    height: 25,
  },
  title_btn: {
    marginLeft: 10,
    ...fonts.semi_bold16,
    color: colors.textColor.gray9,
  },
})
