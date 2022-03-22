import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors, styleView } from '@app/theme'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import DateUtils from '@app/utils/DateUtils'

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
      <RNTextInput
        containerStyle={stylesDate.container_input_date}
        returnKeyType={'next'}
        inputContainerStyle={stylesDate.v_input_date}
        placeholder={R.strings().date_of_birthday}
        leftIcon={R.images.ic_calendar}
        value={dateBirth}
        editable={false}
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
    paddingVertical: 2,
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
})
