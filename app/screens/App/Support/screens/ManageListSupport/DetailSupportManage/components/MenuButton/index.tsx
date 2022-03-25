import FastImage, { Source } from 'react-native-fast-image'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import Modal from 'react-native-modal'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'

const MenuButton = () => {
  const [show, setShow] = useState(false)
  return (
    <View style={styles.ctn}>
      <TouchableOpacity style={styles.accept}>
        <View style={styles.v_content_accept}>
          <FastImage
            tintColor={'white'}
            source={R.images.ic_accept_support}
            style={styles.ic_accept}
          />
          <Text
            style={{ ...fonts.semi_bold16, color: colors.white }}
            children={'Phê duyệt'}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShow(true)
        }}
        style={styles.btn_show}
      >
        <Text
          style={{
            ...fonts.semi_bold24,
            color: colors.primary,
          }}
          children={'...'}
        />
      </TouchableOpacity>

      <Modal
        onBackdropPress={() => {
          setShow(false)
        }}
        isVisible={show}
      >
        <View style={styles.v_ctn_modal}>
          <View style={styles.v_option}>
            <RowBtn
              onPress={() => {
                setShow(false)
                NavigationUtil.navigate(SCREEN_ROUTER_APP.EDIT_SUPPORT_MANAGE)
              }}
              source={R.images.ic_edit_support}
              name={'Chỉnh sửa'}
              line
            />
            <RowBtn
              onPress={() => {}}
              source={R.images.ic_request_edit_support}
              name={'Yêu cầu chỉnh sửa'}
            />
            <RowBtn
              onPress={() => {}}
              source={R.images.ic_cancel_support}
              name={'Từ chối'}
              line
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setShow(false)
            }}
            style={styles.btn_cancel}
          >
            <Text
              style={{ ...fonts.semi_bold20, color: colors.textColor.gray7 }}
              children={'Hủy'}
            />
          </TouchableOpacity>
        </View>
      </Modal>
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

export default MenuButton

const styles = StyleSheet.create({
  ctn: {
    ...styleView.rowItem,
    paddingHorizontal: 15,
  },
  accept: {
    ...styleView.rowItem,
    flex: 3,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    marginRight: 15,
    borderRadius: 16,
    paddingVertical: 14,
  },
  v_content_accept: {
    ...styleView.rowItem,
    alignItems: 'center',
  },
  ic_accept: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  btn_show: {
    ...styleView.rowItem,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 16,
    paddingBottom: 11,
    borderColor: colors.primary,
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
  btn_cancel: {
    backgroundColor: colors.white,
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 14,
  },
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
})
