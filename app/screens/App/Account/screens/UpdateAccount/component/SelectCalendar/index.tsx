import {
  Keyboard,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  TextStyle,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { colors, fonts, styleView } from '@app/theme'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DateUtils from '@app/utils/DateUtils'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'

const SelectDateBirth = ({
  value,
  onChange,
  onBlur,
  errorMessage,
  touched,
  onSubmitEditing,
  errorStyle,
}: {
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  errorMessage?: string
  value?: string
  onChange: (text: any) => void
  touched?: boolean
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void
  errorStyle?: StyleProp<TextStyle>
}) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <>
      <TouchableOpacity
        style={stylesDate.ctn}
        onPress={() => {
          Keyboard.dismiss()
          setShow(true)
        }}
      >
        <RNTextInput
          containerStyle={stylesDate.container_input_date}
          returnKeyType={'next'}
          inputContainerStyle={stylesDate.v_input_date}
          placeholder={R.strings().date_of_birthday}
          leftIcon={R.images.ic_calendar}
          // onChangeText={(text: string) => {
          //   onChange(text)
          // }}
          value={DateUtils.formatShortDate(value)}
          editable={false}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          // errorMessage={errorMessage}
          // touched={touched}
        />
        <FstImage source={R.images.ic_down} style={stylesDate.right_icon} />
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
            setShow(false)
            onChange(`${date.toISOString()}`)
            // console.log(`${date.toISOString()}`)
          }}
        />
      </TouchableOpacity>
      {!!errorMessage && touched && (
        <Text
          style={[stylesDate.error_message, errorStyle]}
          children={errorMessage}
        />
      )}
    </>
  )
}

export default SelectDateBirth

const stylesDate = StyleSheet.create({
  ctn: {
    ...styleView.rowItem,
    marginTop: 25,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 3,
  },
  right_icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  container_input_date: {
    flex: 1,
  },
  v_input_date: {},
  error_message: {
    ...fonts.italic12,
    textAlign: 'right',
    color: '#FFB7B7',
    marginTop: '2%',
  },
})
