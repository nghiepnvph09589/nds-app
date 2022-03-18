import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'

/* eslint-disable prettier/prettier */
import FastImage from 'react-native-fast-image'
import R from '@app/assets/R'
import React from 'react'
import { Source } from 'react-native-fast-image'

const { width } = Dimensions.get('window')

const Avatar = ({ onPress, source }: { onPress: () => void, source: Source | number }) => {
    return (
        <View style={styles.v_container}>
            <FastImage source={source || R.images.img_avatar_default} style={styles.img_avatar} />
            <TouchableOpacity
                onPress={onPress}
                style={styles.btn_edit}>
                <FastImage source={R.images.ic_edit_avatar} style={styles.img_camera} />
            </TouchableOpacity>
        </View>
    )
}
export default Avatar

const styles = StyleSheet.create({
    v_container: {
        alignSelf: 'center',
        marginTop: 5,
    },
    img_avatar: {
        width: width * 0.3,
        height: width * 0.3,
    },
    btn_edit: {
        position: 'absolute',
        bottom: 10,
        right: 5,
    },
    img_camera: {
        width: width * 0.057,
        height: width * 0.057,
    },
})