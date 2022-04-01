import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DateUtils from '@app/utils/DateUtils'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'

const SelectDateBirth = ({
  onChange,
}: {
  onChange: (year: string) => void
}) => {
  const [show, setShow] = useState<boolean>(false)
  const [dateBirth, setDateBirth] = useState<string>('')

  return (
    <TouchableOpacity
      style={stylesDate.ctn}
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
      <View style={stylesDate.container_input_date}>
        <FstImage source={R.images.ic_calendar} style={stylesDate.right_icon} />
        <Text
          style={{
            ...fonts.regular16,
            color: dateBirth ? colors.textColor.gray10 : colors.placeHolder,
          }}
          children={dateBirth || R.strings().date_of_birthday}
        />
      </View>
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
          setDateBirth(DateUtils.formatShortDate(date))
          onChange(DateUtils.formatYear(date))
        }}
      />
    </TouchableOpacity>
  )
}

export default SelectDateBirth

const stylesDate = StyleSheet.create({
  ctn: {
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
