import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import { API_STATUS } from '@app/constant/Constant'
import BtnDetailPost from './components/BtnDetailPost'
import CharityHouse from './components/CharityHouse'
import Error from '@app/components/Error/Error'
import MenuButton from './components/MenuButton'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import StatusSupport from './components/StatusSupport'
import { colors } from '@app/theme'
import { getDetailSupportManage } from './api'

interface Props {
  route: { params: { id: number; onRefreshData: () => void } }
}
const DetailSupportScreen = (props: Props) => {
  const [data, setData] = useState<dataSupportDetail>()
  const [error, setError] = useState<boolean>(false)
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
    >
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getData} />
        }
      >
        <StatusSupport status={data?.status} />
        <View style={styles.ctn}>
          <CharityHouse data={data} />
          <BtnDetailPost data={data} />
        </View>
      </ScrollView>
      <MenuButton
        id={data?.id}
        onAction={() => {
          props?.route?.params?.onRefreshData()
          getData()
        }}
        status={data?.status}
      />
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
    paddingBottom: 50,
  },
})
