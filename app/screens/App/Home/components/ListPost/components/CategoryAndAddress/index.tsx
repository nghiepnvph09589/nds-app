import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import { colors, fonts } from '@app/theme'
import R from '@app/assets/R'

const CategoryAndAddress = () => {
  return (
    <View style={styles.v_container}>
      <View style={styles.v_content}>
        <FstImage style={styles.icon} source={R.images.ic_list} />
        <TouchableOpacity style={styles.view_column}>
          <Text style={styles.txt_label}>{R.strings().category}</Text>
          <Text style={styles.txt_number}>5</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <FstImage style={styles.icon2} source={R.images.ic_location2} />
        <TouchableOpacity style={styles.view_column}>
          <Text style={styles.txt_label}>{R.strings().address}</Text>
          <Text style={styles.txt_number}>512</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  v_container: {
    backgroundColor: 'white',
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 15,
  },
  v_content: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  icon2: {
    width: 32,
    height: 32,
    marginLeft: 20,
  },
  txt_label: {
    ...fonts.regular15,
    color: '#595959',
    marginBottom: 8,
  },
  line: {
    width: 2,
    height: 33,
    marginLeft: 33,
    backgroundColor: '#8898A7',
  },
  txt_number: {
    ...fonts.semi_bold16,
    color: colors.text,
  },
  view_column: {
    marginLeft: 16,
  },
})

export default CategoryAndAddress
