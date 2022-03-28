import { API_STATUS, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import FastImage, { Source } from 'react-native-fast-image'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { colors, dimensions, fonts, styleView } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { showConfirm, showMessages } from '@app/utils/AlertHelper'

import { ChangeStatusSupport } from '../../api'
import Error from '@app/components/Error/Error'
import FstImage from '@app/components/FstImage'
import Modal from 'react-native-modal'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { useAppSelector } from '@app/store'

const MenuButton = ({
  id,
  onAction,
  status,
}: {
  id?: number
  onAction: () => void
  status?: number
}) => {
  const dataUser = useAppSelector(state => state.accountReducer.data)
  const [show, setShow] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const onAccept = () => {
    showConfirm(
      R.strings().notification,
      dataUser?.role === 2
        ? 'Bạn chắc chắn duyệt ủng hộ này??'
        : 'Bạn chắc chắn gửi yêu cầu phê duyệt này??',
      () => {
        changStatus(1, '')
      }
    )
  }
  const onCancel = () => {
    showConfirm(
      R.strings().notification,
      dataUser?.role === 2
        ? 'Bạn chắc chắn duyệt ủng hộ này??'
        : 'Bạn chắc chắn gửi yêu cầu phê duyệt này??',
      () => {
        changStatus(0, 'Không phê duyệt')
      }
    )
  }
  const changStatus = async (status: number, reason: string) => {
    const payload = {
      id: id,
      params: {
        status: status === 1 ? undefined : 0,
        reason: reason,
      },
    }
    showLoading()
    try {
      const res = await ChangeStatusSupport(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        setError(false)
        if (status === 0) {
          showMessages(R.strings().notification, 'Đã từ chối ủng hộ', () => {
            onAction()
          })
        } else {
          showMessages(
            R.strings().notification,
            dataUser?.role === 2
              ? 'Đã phê duyệt thành công'
              : 'Đã gửi yêu cầu phê duyệt',
            () => {
              onAction()
            }
          )
        }
      }
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      hideLoading()
    }
  }
  const showButtonUpdateStatus = (status?: number) => {
    switch (status) {
      case 1:
        return (
          <ApproveButton
            onPress={onAccept}
            role={dataUser?.role}
            status={status}
          />
        )
      case 2:
        return (
          <ApproveButton
            onPress={onAccept}
            role={dataUser?.role}
            status={status}
          />
        )
      case 3:
        return (
          <UpdateSupportButton
            onPress={() => {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_SUPPORT_MANAGE, {
                id: id,
              })
            }}
          />
        )
    }
  }
  if (error) return <Error reload={() => {}} />
  return (
    <View style={styles.ctn}>
      {showButtonUpdateStatus(status)}
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
        <ModalOption
          cancel={() => {
            setShow(false)
          }}
          cancelSupport={() => {
            setShow(false)
            onCancel()
          }}
          onEdit={() => {
            setShow(false)
            NavigationUtil.navigate(SCREEN_ROUTER_APP.EDIT_SUPPORT_MANAGE)
          }}
          role={dataUser?.role}
        />
      </Modal>
    </View>
  )
}

const ApproveButton = ({
  onPress,
  role,
  status,
}: {
  onPress: () => void
  role: number
  status: number
}) => {
  return (
    <TouchableOpacity
      disabled={status === 2 && role === 3}
      onPress={onPress}
      style={styles.accept}
    >
      <View style={styles.v_content_accept}>
        <FastImage
          tintColor={'white'}
          source={R.images.ic_accept_support}
          style={styles.ic_accept}
        />
        {status === 1 && (
          <Text
            style={{ ...fonts.semi_bold16, color: colors.white }}
            children={role === 2 ? 'Phê duyệt' : 'Yêu cầu phê duyệt'}
          />
        )}
        {status === 2 && (
          <Text
            style={{ ...fonts.semi_bold16, color: colors.white }}
            children={role === 2 ? 'Phê duyệt' : 'Đã yêu cầu phê duyệt'}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}
const UpdateSupportButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.accept}>
      <View style={styles.v_content_accept}>
        <FastImage
          tintColor={'white'}
          source={R.images.ic_accept_support}
          style={styles.ic_accept}
        />
        <Text
          style={{ ...fonts.semi_bold16, color: colors.white }}
          children={'Cập nhật ủng hộ'}
        />
      </View>
    </TouchableOpacity>
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
const ModalOption = ({
  cancel,
  cancelSupport,
  onEdit,
  role,
}: {
  cancelSupport: () => void
  cancel: () => void
  onEdit: () => void
  role: number
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
        {role === 2 && (
          <RowBtn
            onPress={() => {}}
            source={R.images.ic_request_edit_support}
            name={'Yêu cầu chỉnh sửa'}
            line
          />
        )}
        <RowBtn
          onPress={cancelSupport}
          source={R.images.ic_cancel_support}
          name={'Từ chối'}
        />
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

export default MenuButton

const styles = StyleSheet.create({
  ctn: {
    ...styleView.rowItem,
    paddingHorizontal: 15,
    marginBottom: Platform.OS === 'ios' ? (isIphoneX() ? 0 : 20) : 20,
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
