import { ROLE, STATUS_SUPPORT_DETAIL } from '@app/constant/Constant'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import { Source } from 'react-native-fast-image'

const ModalOption = ({
  cancel,
  cancelSupport,
  onEdit,
  role,
  requestEdit,
  status,
  isUpdate,
}: {
  cancelSupport: () => void
  cancel: () => void
  onEdit: () => void
  requestEdit: () => void
  role: number
  status?: number
  isUpdate?: number
}) => {
  return (
    <View style={styles.v_ctn_modal}>
      <View style={styles.v_option}>
        <RowBtn
          onPress={onEdit}
          source={R.images.ic_edit_support}
          name={'Chỉnh sửa'}
          line
        />
        {role === ROLE.OFFICER_PROVINCE && isUpdate === 0 && (
          <RowBtn
            onPress={requestEdit}
            source={R.images.ic_request_edit_support}
            name={'Yêu cầu chỉnh sửa'}
            line
          />
        )}
        {(status === STATUS_SUPPORT_DETAIL.CUSTOMER_SUPPORT ||
          status === STATUS_SUPPORT_DETAIL.DISTRICT_ACCEPT) && (
          <RowBtn
            onPress={cancelSupport}
            source={R.images.ic_cancel_support}
            name={'Từ chối'}
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
