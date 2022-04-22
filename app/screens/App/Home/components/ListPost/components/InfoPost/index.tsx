import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import useTime from './hooks'
import { useAppSelector } from '@app/store'
import { ROLE } from '@app/constant/Constant'

interface InfoPost {
  name: string
  address: string
  avatar: string
  time: Date
}

const InfoPost = (props: InfoPost) => {
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const { name, address, avatar, time } = props

  return (
    <View style={styles.v_row}>
      <FstImage
        resizeMode="cover"
        style={styles.avatar}
        source={avatar ? { uri: avatar } : R.images.img_avatar3}
      />
      <View style={styles.v_row2}>
        <View style={styles.v_info}>
          <Text numberOfLines={2} style={styles.txt_name}>
            {name}{' '}
            <Text style={styles.txt_grey}>
              Tại <Text style={styles.txt_address}>{address}</Text>
            </Text>{' '}
          </Text>
          <Text style={styles.txt_time}>{useTime(time)}</Text>
        </View>
        {userInfo.role === ROLE.OFFICER_WARD && (
          <FstImage
            resizeMode="contain"
            style={styles.img_star}
            source={R.images.ic_star_red}
          />
        )}
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
  img_star: { width: 24, height: 24 },
  v_row2: { flexDirection: 'row', flex: 1, marginRight: 40 },
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
  v_info: {},
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
