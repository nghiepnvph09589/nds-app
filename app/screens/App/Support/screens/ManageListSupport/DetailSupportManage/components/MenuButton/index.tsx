import {
  API_STATUS,
  ROLE,
  SCREEN_ROUTER_APP,
  STATUS_SUPPORT_DETAIL,
} from '@app/constant/Constant'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { colors, fonts, styleView } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { showConfirm, showMessages } from '@app/utils/AlertHelper'

import ApproveButton from './components/Approvebutton'
import { ChangeStatusSupport } from '../../api'
import Modal from 'react-native-modal'
import ModalOption from './components/ModalOption'
import ModalReasonCancel from './components/ModalReasonCancel'
import ModalReasonEdit from './components/ModalReasonEdit'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import UpdateSupportButton from './components/UpdateSupportButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { useAppSelector } from '@app/store'

const MenuButton = ({
  id,
  onAction,
  status,
  data,
  isUpdate,
}: {
  id?: number
  onAction: () => void
  status?: number
  data?: dataSupportDetail
  isUpdate?: number
}) => {
  const dataUser = useAppSelector(state => state.accountReducer.data)
  const [show, setShow] = useState<boolean>(false)
  // const [error, setError] = useState<boolean>(false)
  const [showCancel, setShowCancel] = useState<boolean>(false)
  const [showRequest, setShowRequest] = useState<boolean>(false)
  const onAccept = () => {
    showConfirm(
      R.strings().notification,
      dataUser?.role === ROLE.OFFICER_PROVINCE
        ? 'Bạn chắc chắn duyệt ủng hộ này??'
        : 'Bạn chắc chắn gửi yêu cầu phê duyệt này??',
      () => {
        changStatus(1, '')
      }
    )
  }
  // eslint-disable-next-line no-shadow
  const changStatus = async (status: number, reason: string) => {
    const payload: {
      id?: number
      params: {
        status?: number
        reason: string
      }
    } = {
      id: id,
      params: {
        status:
          status === STATUS_SUPPORT_DETAIL.DISTRICT_ACCEPT ? undefined : 0,
        reason: reason,
      },
    }
    showLoading()
    try {
      const res = await ChangeStatusSupport(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        // setError(false)
        showMessages(
          R.strings().notification,
          dataUser?.role === ROLE.OFFICER_PROVINCE
            ? 'Đã phê duyệt thành công'
            : 'Đã gửi yêu cầu phê duyệt',
          () => {
            onAction()
          }
        )
      }
    } catch (error) {
      // setError(true)
      console.log(error)
    } finally {
      hideLoading()
    }
  }
  // eslint-disable-next-line no-shadow
  const showButtonUpdateStatus = (status?: number) => {
    switch (status) {
      case STATUS_SUPPORT_DETAIL.CUSTOMER_SUPPORT:
        return (
          <ApproveButton
            onPress={onAccept}
            role={dataUser?.role}
            status={status}
          />
        )
      case STATUS_SUPPORT_DETAIL.DISTRICT_ACCEPT:
        return (
          <ApproveButton
            onPress={onAccept}
            role={dataUser?.role}
            status={status}
          />
        )
      case STATUS_SUPPORT_DETAIL.PROVINCE_ACCEPT:
        return (
          <UpdateSupportButton
            onPress={() => {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_SUPPORT_MANAGE, {
                id: id,
                onAction,
              })
            }}
          />
        )
    }
  }
  // if (error) return <Error reload={() => {}} />
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
            setTimeout(() => {
              setShowCancel(true)
            }, 500)
            setShow(false)
          }}
          onEdit={() => {
            setShow(false)
            NavigationUtil.navigate(SCREEN_ROUTER_APP.EDIT_SUPPORT_MANAGE, {
              id: id,
              data: data,
              onAction,
            })
          }}
          role={dataUser?.role}
          requestEdit={() => {
            setTimeout(() => {
              setShowRequest(true)
            }, 500)
            setShow(false)
          }}
          status={status}
          isUpdate={isUpdate}
        />
      </Modal>
      <ModalReasonCancel
        showCancel={showCancel}
        setShowCancel={setShowCancel}
        submit={onAction}
        id={id}
      />
      <ModalReasonEdit
        showRequest={showRequest}
        setShowRequest={setShowRequest}
        submit={onAction}
        id={id}
      />
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
  btn_show: {
    ...styleView.rowItem,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 16,
    paddingBottom: 11,
    borderColor: colors.primary,
  },
})
