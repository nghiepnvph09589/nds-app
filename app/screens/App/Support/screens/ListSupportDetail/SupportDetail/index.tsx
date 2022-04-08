import { API_STATUS, STATUS_SUPPORT_DETAIL } from '@app/constant/Constant'
import React, { useEffect, useState } from 'react'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import AfterUpdate from '../../ManageListSupport/DetailSupportManage/components/AfterUpdate'
import CharityHouse from '../../ManageListSupport/DetailSupportManage/components/CharityHouse'
import Error from '@app/components/Error/Error'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { View } from 'react-native'
import { colors } from '@app/theme'
import { getDetailSupportManage } from '../../ManageListSupport/DetailSupportManage/api'

interface Props {
  route: { params: { id: number; onRefreshData: () => void } }
}
const SupportDetailScreen = (props: Props) => {
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
      borderBottomHeader={colors.border}
      scroll
    >
      {/* <View style={styles.ctn}>
        <ContentDetail data={data} />
        <BodyDetail data={data} />
      </View> */}
      <View style={{ paddingHorizontal: 15 }}>
        <CharityHouse data={data} />
        {data?.status === STATUS_SUPPORT_DETAIL.UPDATE_SUPPORT && (
          <AfterUpdate data={data} />
        )}
      </View>
    </ScreenWrapper>
  )
}
export default SupportDetailScreen
// const styles = StyleSheet.create({
//   ctn: {
//     marginTop: 1,
//     backgroundColor: colors.white,
//   },
// })
