import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors, styleView } from '@app/theme'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import { formatShortDate } from '@app/utils/DateUtils'

const SelectDateBirth = ({
    value,
    onChange,
}: {
    value?: string
    onChange: (text: any) => void
}) => {
    const [show, setShow] = useState<boolean>(false)
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
                onChangeText={(text: string) => {
                    onChange(text)
                }}
                value={value}
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
                    onChange(formatShortDate(date))
                }}
            />
        </TouchableOpacity>
    )
}

export default SelectDateBirth

const stylesDate = StyleSheet.create({
    ctn: {
        ...styleView.rowItem,
        marginTop: 16,
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: 4,
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
