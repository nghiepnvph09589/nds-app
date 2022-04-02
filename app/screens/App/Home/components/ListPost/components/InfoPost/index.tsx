import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import useTime from './hooks'

interface InfoPost {
  name: string
  address: string
  avatar: string
  time: Date
}

const InfoPost = (props: InfoPost) => {
  const { name, address, avatar, time } = props

  return (
    <View style={styles.v_row}>
      <FstImage
        resizeMode="cover"
        style={styles.avatar}
        source={avatar ? { uri: avatar } : R.images.img_avatar3}
      />
      <View style={styles.v_info}>
        <Text style={styles.txt_name}>
          {name}{' '}
          <Text style={styles.txt_grey}>
            Tại <Text style={styles.txt_address}>{address}</Text>
          </Text>{' '}
        </Text>
        <Text style={styles.txt_time}>{useTime(time)}</Text>
      </View>
      <TouchableOpacity>
        <FstImage
          resizeMode="contain"
          style={styles.icon}
          source={R.images.ic_more}
        />
      </TouchableOpacity>
    </View>
  )
}

export default InfoPost

const styles = StyleSheet.create({
  v_row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 16,
  },
  v_info: {
    flex: 1,
    marginRight: 25,
  },
  txt_name: {
    ...fonts.regular14,
    fontWeight: '500',
    color: colors.text,
  },
  txt_grey: {
    ...fonts.regular14,
    color: '#8C8C8C',
  },
  txt_address: {
    ...fonts.regular14,
    fontWeight: '500',
    color: colors.text,
  },
  txt_time: {
    ...fonts.regular14,
    color: '#8C8C8C',
    marginTop: 7,
  },
  icon: {
    width: 20,
    height: 20,
  },
})
