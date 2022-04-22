import { StyleSheet, Text, View } from 'react-native'

import R from '@app/assets/R'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme/colors'
import { fonts } from '@app/theme'

const TermsScreen = () => {
  const terms = [
    {
      title: '1. Nguyên tắc hoạt động của iNhandao:',
      content:
        '- Nguyên tắc này áp dụng cho các thành viên đăng ký sử dụng, tham gia tạo các địa chỉ nhân đạo được thực hiện trên iNhandao:',
      itemContent: [
        '   + iNhandao là nền tảng để đưa thông tin về các địa chỉ nhân đạo khó khăn, kêu gọi ủng hộ từ cộng động, các nhà hảo tâm.',
        '   + Địa chỉ nhân đạo tham gia trên iNhandaoLaoCai phải đáp ứng đủ các quy định của pháp luật có liên quan và phù hợp với thuần phong mỹ tục của Việt Nam.',
        '   + Tất cả các nội dung trong Điều khoản này phải tuân thủ theo hệ thống pháp luật hiện hành của Việt Nam. Thành viên khi tham gia vào iNhandaoLaoCai phải tự tìm hiểu trách nhiệm pháp lý của mình đối với pháp luật hiện hành của Việt Nam và cam kết thực hiện đúng những nội dung trong quy định của iNhandao.',
      ],
    },
    {
      title: '2. Quy định về người sử dụng:',
      content:
        '- Người tạo các địa chỉ nhân đạo phải là các tổ chức, cá nhân hoạt động một cách hợp pháp, phải đăng ký kê khai thông tin cá nhân theo quy định của iNhandao và của pháp luật, được phép tạo địa chỉ nhân đạo sau khi hoàn tất thủ tục đăng ký thành viên. Người đăng tin phải đảm bảo rằng:',
      itemContent: [
        '   + Có đầy đủ năng lực hành vi dân sự;',
        '   + Tuân theo các điều khoản trong Quy chế này về việc sử dụng dịch vụ của iNhandao;',
        '   + Bảo vệ mật khẩu đăng nhập và giám sát các thông tin liên quan đến tài khoản, đồng ý chịu hoàn toàn trách nhiệm trong trường hợp tài khoản của người tạo địa chỉ nhân đạo được sử dụng bởi bất cứ ai mà người tạo địa chỉ nhân đạo cho phép truy cập và sử dụng.',
        '   + Toàn bộ thông tin cung cấp cho iNhandao là thông tin cá nhân của người tạo địa chỉ nhân đạo, chính xác, đầy đủ, đúng sự thật và cập nhật đầy đủ, kịp thời ngay sau khi có sự thay đổi.',
        '   + Cá nhân, Doanh nghiệp, Tổ chức khác ở vai trò là Người ủng hộ thì cần tuân thủ Quy chế hoạt động này, đăng ký, đăng nhập, xem xét thông tin chiến dịch nhân đạo, địa chỉ nhân đạo, thực hiện ủng hộ trên cơ sở tôn trọng quyền và lợi ích hợp pháp của tất cả các bên tham gia và không trái với quy định của pháp luật.',
      ],
    },
  ]
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().terms}
      borderBottomHeader={colors.border}
      scroll
    >
      {terms.map((items, index) => (
        <View key={`${index}`} style={styles.ctn_item}>
          <Text children={items.title} style={styles.title} />
          <Text children={items.content} style={styles.content} />
          {items.itemContent.map((item, indexs) => (
            <Text
              key={`${indexs}`}
              children={item}
              style={styles.itemContent}
            />
          ))}
        </View>
      ))}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  ctn_item: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  title: {
    ...fonts.semi_bold14,
    lineHeight: 26,
    color: colors.textColor.gray9,
  },
  content: {
    ...fonts.regular15,
    color: colors.textColor.gray9,
    lineHeight: 20,
  },
  itemContent: {
    ...fonts.regular14,
    color: colors.textColor.gray9,
    lineHeight: 19,
  },
})
export default TermsScreen
