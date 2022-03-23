import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '@app/theme'

const Content = () => {
  return (
    <View style={styles.v_contain}>
      <Text style={styles.txt_title}>
        "Cùng em học trực tuyến" - Nâng niu triệu ước mơ học vấn không gián đoạn
      </Text>
      <Text style={styles.text}>
        Năm học mới 2021-2022 đã chính thức được bắt đầu. Năm học này bắt đầu
        thật đặc biệt khi đại dịch Covid hoành hành khiến nhiều học sinh và thầy
        cô không thể trực tiếp tới trường. Mặc dù vậy, các tỉnh, thành phố trên
        cả nước tổ chức khai giảng năm học mới với nhiều hình thức linh hoạt,
        tạo động lực cho các thầy cô, học sinh và toàn ngành giáo dục quyết tâm
        hoàn thành các mục tiêu đề ra trong năm học mới.
      </Text>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({
  v_contain: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  txt_title: {
    ...fonts.semi_bold16,
    textAlign: 'justify',
    color: colors.text,
  },
  text: {
    ...fonts.regular16,
    marginTop: 12,
    textAlign: 'justify',
    color: colors.text,
  },
})
