import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface SelectAddressProps {
  onSaveDataLocation: ({ lt, lng }: { lt: number; lng: number }) => void
}

const SelectAddress = (props: SelectAddressProps) => {
  const { onSaveDataLocation } = props

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.ADDRESS_MAP, {
          onCallBack: onSaveDataLocation,
        })
      }}
      style={styles.v_container}
    >
      <FstImage
        resizeMode="contain"
        style={styles.icon}
        source={R.images.ic_location4}
      />
      <Text style={styles.text}>{R.strings().select_address_map}</Text>
      <FstImage
        resizeMode="contain"
        style={styles.icon}
        source={R.images.ic_arrow_right}
      />
    </TouchableOpacity>
  )
}

export default SelectAddress

const styles = StyleSheet.create({
  v_container: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    marginTop: 20,
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    paddingHorizontal: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    ...fonts.regular16,
    color: colors.text,
    marginLeft: 24,
    flex: 1,
  },
})
