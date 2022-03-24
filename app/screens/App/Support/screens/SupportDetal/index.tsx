import { StyleSheet, View } from 'react-native'

import BodyDetail from './components/BodyDetail'
import ContentDetail from './components/ContentDetail'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme'

const data = {
  title: '15/02 Trần Dần ủng hộ 2 tỷ đồng cho Gia Đình anh Văn Sĩ Hùng',
  content:
    'Thật may mắn cho gia đình anh Hùng khi một nhà hảo tâm đã đến và ủng hộ cho gia đình anh, người ủng hộ ko ai khác mà chính là nhà tiên tri vũ trụ Trần Dần',
  create_at: '2022-03-23T06:50:00.000Z',
  name: 'Tiến Bịp',
  phone: '0987654321',
  content_support: 'Mong các cháu chăm chỉ học hành',
  formSupport: [
    {
      id: 1,
      name: 'Lương thực, thực phẩm',
    },
    {
      id: 2,
      name: 'Sinh kế',
    },
    {
      id: 3,
      name: 'Học bổng',
    },
    {
      id: 4,
      name: 'Xây nhà',
    },
  ],
  list_image: [
    {
      id: 1,
      url: 'http://hinhnenhd.com/top-60-hinh-anh-thi-nhung-ngot-ngao-tre-trung-xinh-dep-nhat/top-60-hinh-anh-thi-nhung-ngot-ngao-tre-trung-xinh-dep-nhat-12/',
    },
    {
      id: 2,
      url: 'https://truongnguoita.vn/wp-content/uploads/2018/10/Net-dep-Bien-Hoa.png',
    },
    {
      id: 3,
      url: 'http://hinhnenhd.com/top-60-hinh-anh-thi-nhung-ngot-ngao-tre-trung-xinh-dep-nhat/top-60-hinh-anh-thi-nhung-ngot-ngao-tre-trung-xinh-dep-nhat-3/',
    },
    {
      id: 4,
      url: 'http://hinhnenhd.com/top-60-hinh-anh-thi-nhung-ngot-ngao-tre-trung-xinh-dep-nhat/top-60-hinh-anh-thi-nhung-ngot-ngao-tre-trung-xinh-dep-nhat-3/',
    },
  ],
}
const SupportDetailScreen = () => {
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Chi tiết ủng hộ'}
      backgroundColor={colors.backgroundColor}
      scroll
    >
      <View style={styles.ctn}>
        <ContentDetail data={data} />
        <BodyDetail data={data} />
      </View>
    </ScreenWrapper>
  )
}
export default SupportDetailScreen
const styles = StyleSheet.create({
  ctn: {
    marginTop: 1,
    backgroundColor: colors.white,
  },
})
