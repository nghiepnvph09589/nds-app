import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SelectProvince = () => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#D0DBEA',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
      }}
    >
      <Text>Chọn địa chỉ</Text>
    </TouchableOpacity>
  )
}

export default SelectProvince

const styles = StyleSheet.create({})
