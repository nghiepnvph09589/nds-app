import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import React from 'react'

const Title = ({ title, requite }: { title: string; requite?: boolean }) => {
    return (
        <View style={styles.v_ctn_title}>
            <Text style={styles.txt_title} children={title} />
            {requite && <Text style={styles.ic_requite} children={'*'} />}
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    v_ctn_title: {
        ...styleView.rowItem,
        marginTop: 9,
    },
    txt_title: {
        ...fonts.semi_bold16,
        color: colors.textColor.gray9,
        lineHeight: 24,
    },
    ic_requite: {
        ...fonts.regular16,
        color: '#D9251B',
        lineHeight: 24,
        marginLeft: 8,
    },
})
