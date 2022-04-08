import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '@app/theme'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import { API_STATUS } from '@app/constant/Constant'
import Empty from '@app/components/Empty/Empty'
import FastImage from 'react-native-fast-image'
import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import RenderHTML from 'react-native-render-html'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getBannerDetail } from './api'

interface Data {
  image_url: string
  title_banner: string
  create_at: string
  description: string
}
interface Props {
  route: {
    params?: {
      id_banner?: number
    }
  }
}

const { width } = Dimensions.get('window')
const BannerDetailScreen = (props: Props) => {
  const id_banner = props.route?.params?.id_banner
  const [data, setData] = useState<Data>()
  const [error, setError] = useState<boolean>(false)
  const getData = async () => {
    const payload = {
      id: id_banner,
    }
    showLoading()
    try {
      const res = await getBannerDetail(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        setData(res?.data)
        setError(false)
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setError(true)
    } finally {
      hideLoading()
    }
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.v_container}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <View style={styles.v_header}>
        {error ? (
          <Empty description={'Tin tức không tồn tại'} />
        ) : (
          <RenderBody data={data} />
        )}
      </View>
    </View>
  )
}

const RenderBody = ({ data }: { data: any }) => {
  return (
    <View>
      <FstImage
        source={{
          uri: data?.media_url,
        }}
        resizeMode={'contain'}
        style={styles.banner}
      />
      <View style={styles.ctn_txt}>
        <Text style={styles.sm16_gr9} children={data?.title} />
        {/* <Text style={styles.description} children={data?.content} /> */}
        <RenderHTML source={{ html: data?.content }} />
      </View>
      <View style={styles.v_back}>
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.goBack()
          }}
          style={styles.btn_back}
        >
          <FastImage
            tintColor={colors.white}
            source={R.images.ic_back}
            style={styles.ic_back}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default BannerDetailScreen
const styles = StyleSheet.create({
  v_header: {
    paddingTop:
      Platform.OS === 'ios'
        ? isIphoneX()
          ? getStatusBarHeight() + 20
          : 16
        : getStatusBarHeight() + 18,
  },
  v_container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  banner: {
    width: width,
    height: width / 2.1,
  },
  ctn_txt: {
    padding: 15,
  },
  sm16_gr9: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray9,
  },
  description: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
    marginTop: 15,
  },
  ic_back: {
    width: 25,
    height: 25,
  },
  btn_back: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 7,
  },
  v_back: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
})
