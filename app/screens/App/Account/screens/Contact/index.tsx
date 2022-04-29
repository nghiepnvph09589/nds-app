import LinkingUtils, { LINKING_TYPE } from '@app/utils/LinkingUtils'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { fonts, styleView } from '@app/theme'

import { CONTACT } from '@app/constant/Constant'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { Source } from 'react-native-fast-image'
import { colors } from '@app/theme/colors'

interface Contact {
  type: number
  name: string
  title: string
  value: string
  ic: Source
}
const ContactScreen = () => {
  const listContact: Contact[] = [
    {
      type: LINKING_TYPE.CALL,
      name: 'Tổng đài',
      title: CONTACT.PHONE,
      value: CONTACT.PHONE,
      ic: R.images.ic_contact_phone,
    },
    // {
    //     type: LINKING_TYPE.WEB,
    //     name: 'Facebook',
    //     title: 'Kết nối với chúng tôi trên Facebook',
    //     value: CONTACT.FACEBOOK,
    //     ic: R.images.ic_contact_fb,
    // },
    // {
    //     type: LINKING_TYPE.ZALO,
    //     name: 'Zalo',
    //     title: 'Gửi câu hỏi của bạn',
    //     value: CONTACT.PHONE,
    //     ic: R.images.ic_contact_zalo,
    // },
  ]

  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().contact}
    >
      <ScrollView>
        {listContact.map((item: Contact, index: number) => {
          return (
            <TouchableOpacity
              key={`${index}`}
              style={styles.item}
              onPress={() => {
                LinkingUtils(item.type, item.value)
              }}
            >
              <FstImage source={item.ic} style={styles.ic} />
              <View style={styles.v_detail}>
                <Text style={styles.txt_name} children={item.name} />
                <Text style={styles.txt_title} children={item.title} />
              </View>
              <FstImage
                source={R.images.ic_arrow_right}
                style={styles.ic_right}
              />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </ScreenWrapper>
  )
}

export default ContactScreen

const styles = StyleSheet.create({
  ic_right: {
    width: 25,
    height: 25,
  },
  v_detail: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
    height: 51,
  },
  ic: {
    width: 35,
    height: 35,
    marginVertical: 8,
  },
  item: {
    ...styleView.rowItem,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 17,
    alignItems: 'center',
  },
  txt_name: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
  },
  txt_title: {
    ...fonts.regular14,
    color: colors.textColor.gray8,
  },
})
