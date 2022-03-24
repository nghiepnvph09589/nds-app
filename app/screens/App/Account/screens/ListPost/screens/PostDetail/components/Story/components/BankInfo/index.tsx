import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, fonts } from '@app/theme'
import R from '@app/assets/R'

const BankInfo = () => {
  return (
    <View style={styles.v_container}>
      <Text style={styles.txt_bank}>Vietcombank</Text>
      <Text style={styles.txt_title}>{R.strings().account_name}</Text>
      <Text style={styles.text}>Hội chữ thập đỏ Việt Nam</Text>
      <Text style={styles.txt_title2}>{R.strings().account_number}</Text>
      <View style={styles.v_row}>
        <Text style={styles.text}>0301003363123</Text>
        <TouchableOpacity style={styles.v_copy}>
          <Text style={styles.txt_copy}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BankInfo

const styles = StyleSheet.create({
  v_container: {
    marginTop: 25,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  txt_bank: {
    ...fonts.semi_bold16,
    textAlign: 'right',
    color: colors.text,
  },
  txt_title: {
    ...fonts.regular14,
    color: '#595959',
  },
  txt_title2: {
    ...fonts.regular14,
    color: '#595959',
    marginTop: 16,
  },
  text: {
    ...fonts.regular16,
    color: colors.text,
    marginTop: 8,
    flex: 1,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_copy: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  txt_copy: {
    ...fonts.semi_bold16,
    color: 'white',
  },
})
