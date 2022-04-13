import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DateUtils from '@app/utils/DateUtils'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'

const InputUpdate = ({
  title,
  content,
  setTitle,
  setContent,
  onChange,
}: {
  title: string
  content: string
  setTitle: (text: string) => void
  setContent: (text: string) => void
  onChange: (year: string) => void
}) => {
  const [show, setShow] = useState<boolean>(false)
  const [dateBirth, setDateBirth] = useState<string>('')
  return (
    <View style={styles.ctn}>
      <TextInput
        onChangeText={text => setTitle(text)}
        value={title}
        multiline
        maxLength={200}
        placeholder={'Nhâp tiêu để...'}
        style={styles.input}
        placeholderTextColor={'#8898A7'}
      />
      <TextInput
        onChangeText={text => setContent(text)}
        value={content}
        multiline
        // maxLength={200}
        placeholder={'Nhâp nội dung...'}
        style={styles.input_content}
        placeholderTextColor={'#8898A7'}
      />
      <TouchableOpacity
        style={styles.ctn_date}
        onPress={() => {
          setShow(true)
        }}
      >
        {/* <RNTextInput
        containerStyle={stylesDate.container_input_date}
        returnKeyType={'next'}
        inputContainerStyle={stylesDate.v_input_date}
        placeholder={R.strings().date_of_birthday}
        leftIcon={R.images.ic_calendar}
        value={dateBirth}
        editable={false}
      /> */}
        <View style={styles.container_input_date}>
          <FstImage source={R.images.ic_calendar} style={styles.right_icon} />
          <Text
            style={{
              ...fonts.regular16,
              color: dateBirth ? colors.textColor.gray10 : colors.placeHolder,
            }}
            children={dateBirth || 'Ngày thực hiện'}
          />
        </View>
        <FstImage source={R.images.ic_down} style={styles.right_icon} />
        <DateTimePickerModal
          locale={'vi'}
          timePickerModeAndroid={'spinner'}
          isVisible={show}
          maximumDate={new Date()}
          confirmTextIOS={R.strings().choose}
          cancelTextIOS={R.strings().cancel}
          mode="date"
          onCancel={() => setShow(false)}
          onConfirm={(date: Date) => {
            // console.log(date.toISOString())
            setShow(false)
            setDateBirth(DateUtils.formatShortDate(date))
            onChange(date.toISOString())
          }}
        />
      </TouchableOpacity>
    </View>
  )
}
export default InputUpdate

const styles = StyleSheet.create({
  input: {
    paddingTop: 14,
    marginTop: 17,
    borderWidth: 1,
    padding: 12,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    borderRadius: 16,
    borderColor: colors.border,
  },
  input_content: {
    paddingTop: 14,
    marginTop: 17,
    borderWidth: 1,
    padding: 12,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    borderRadius: 16,
    borderColor: colors.border,
    minHeight: 100,
    maxHeight: 200,
  },
  ctn: {
    paddingHorizontal: 15,
  },
  ctn_date: {
    ...styleView.rowItem,
    marginTop: 17,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 13,
  },
  right_icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  container_input_date: {
    ...styleView.rowItem,
    alignItems: 'center',
    flex: 1,
    paddingLeft: 15,
  },
  v_input_date: {},
})
