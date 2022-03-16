import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fonts, styleView } from '@app/theme'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import FstImage from '@app/components/FstImage'
/* eslint-disable prettier/prettier */
import R from '@app/assets/R'
import { colors } from '@app/theme/colors'
import moment from 'moment'

export { moment }

const SelectCalendar = ({ value, onChange }: { value: string, onChange: (value: any) => void }) => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <View>
            <TouchableOpacity
                style={styles.input_date_birth}
                onPress={() => { setShow(true) }}
            >
                <View style={styles.v_in}>
                    <FstImage
                        source={R.images.ic_calendar}
                        style={styles.icon_right}
                    />
                    {value ?
                        <Text style={styles.value} children={value} />
                        :
                        <Text style={styles.input_place} children={R.strings().date_of_birthday} />
                    }
                </View>
                <FstImage
                    source={R.images.ic_down}
                    style={styles.icon_right}
                    resizeMode="contain"
                />
            </TouchableOpacity>
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
        </View>
    )
}
const formatShortDate = (timestamp: any) =>
    moment(timestamp).utcOffset(7).format('DD/MM/YYYY')
export default SelectCalendar

const styles = StyleSheet.create({
    ctn_date_birth: {
        flex: 1,
    },
    container_input: {
        marginTop: 27,
    },
    icon_right: {
        width: 24,
        aspectRatio: 1,
        marginRight: 10,
    },
    input_date_birth: {
        borderRadius: 16,
        marginTop: 27,
        ...styleView.rowItem,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: 14,
    },
    left_ic: {
        width: 25,
        height: 25,
    },
    value: {
        ...fonts.regular16,
        flex: 1,
        paddingVertical: 0,
        color: colors.text,
    },
    v_in: {
        ...styleView.rowItem,
        flex: 1,
        paddingHorizontal: 17,
    },
    input_place: {
        ...fonts.regular16,
        flex: 1,
        paddingVertical: 0,
        color: colors.placeHolder,
    },
})
