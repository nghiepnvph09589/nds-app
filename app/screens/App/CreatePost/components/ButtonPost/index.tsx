import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { fonts } from '@app/theme'
import R from '@app/assets/R'

const ButtonPost = () => {
  return (
    <TouchableOpacity style={styles.v_container}>
      <Text style={styles.text}>{R.strings().post}</Text>
    </TouchableOpacity>
  )
}

export default ButtonPost

const styles = StyleSheet.create({
  v_container: {
    backgroundColor: '#D0DBEA',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  text: {
    ...fonts.semi_bold16,
    color: '#6C757D',
  },
})
