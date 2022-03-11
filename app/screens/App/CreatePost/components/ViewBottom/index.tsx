import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import { Source } from 'react-native-fast-image'

const ViewBottom = () => {
  return (
    <View>
      <ViewRow icon={R.images.ic_image} label={R.strings().image} />
      <ViewRow icon={R.images.ic_location4} label={R.strings().location} />
      <ViewRow icon={R.images.ic_package} label={R.strings().offer} />
    </View>
  )
}

const ViewRow = ({ icon, label }: { icon: number | Source; label: string }) => {
  return (
    <>
      <View style={styles.line} />
      <TouchableOpacity style={styles.v_row}>
        <FstImage style={styles.icon} source={icon} />
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </>
  )
}

export default ViewBottom

const styles = StyleSheet.create({
  line: {
    backgroundColor: '#D0DBEA',
    height: 2,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    ...fonts.semi_bold16,
    marginLeft: 16,
    color: colors.text,
  },
})
