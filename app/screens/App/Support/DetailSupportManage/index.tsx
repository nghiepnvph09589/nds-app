import { API_STATUS, ROLE, STATUS_SUPPORT_DETAIL } from '@app/constant/Constant'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import AfterUpdate from '../components/AfterUpdate'
import BtnDetailPost from '../components/BtnDetailPost'
import BtnUpdateCustomer from '../components/BtnUpdateCustomer'
import CharityHouse from '../components/CharityHouse'
import Error from '@app/components/Error/Error'
import MenuButton from '../components/MenuButton'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import StatusSupport from '../components/StatusSupport'
import { colors } from '@app/theme'
import { getDetailSupportManage } from './api'
import { useAppSelector } from '@app/store'

interface Props {
  route: {
    params: {
      id: number
      onRefreshData: () => void
      customer: number
      setPageList: (page: number) => void
    }
  }
}
const DetailSupportScreen = (props: Props) => {
  const [data, setData] = useState<dataSupportDetail>()
  const [error, setError] = useState<boolean>(false)
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const getData = async () => {
    showLoading()
    const payload = {
      id: props?.route?.params?.id,
    }
    try {
      const res = await getDetailSupportManage(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        setData(res.data)
        setError(false)
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      hideLoading()
    }
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const checkRoleMenu = () => {
    if (userInfo.role === ROLE.OFFICER_PROVINCE) {
      if (userInfo.province_id === data?.province_id) {
        return 1
      } else {
        return 0
      }
    } else if (userInfo.role === ROLE.OFFICER_DISTRICT) {
      if (userInfo.district_id === data?.district_id) {
        return 1
      } else {
        return 0
      }
    }
  }
  if (error) return <Error reload={getData} />
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Chi tiết ủng hộ'}
      backgroundColor={colors.white}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
      borderBottomHeader={colors.border}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getData} />
        }
      >
        <StatusSupport status={data?.status} isUpdate={data?.is_update} />
        <View style={styles.ctn}>
          <CharityHouse data={data} />
          <BtnDetailPost data={data} />
          {data?.status === STATUS_SUPPORT_DETAIL.UPDATE_SUPPORT && (
            <AfterUpdate data={data} />
          )}
        </View>
      </ScrollView>
      {data?.status !== STATUS_SUPPORT_DETAIL.DENY &&
        data?.status !== STATUS_SUPPORT_DETAIL.UPDATE_SUPPORT &&
        userInfo.role !== ROLE.OFFICER_WARD &&
        userInfo.role !== ROLE.CUSTOMER &&
        checkRoleMenu() === 1 && (
          <MenuButton
            id={data?.id}
            onAction={() => {
              props?.route?.params?.onRefreshData()
              getData()
            }}
            status={data?.status}
            data={data}
          />
        )}

      {data?.status === STATUS_SUPPORT_DETAIL.CUSTOMER_SUPPORT &&
        props.route.params.customer && (
          <BtnUpdateCustomer
            data={data}
            onAction={() => {
              props?.route?.params?.onRefreshData()
              getData()
            }}
          />
        )}
    </ScreenWrapper>
  )
}
export default DetailSupportScreen

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  scroll: {
    paddingBottom: 40,
  },
})
