import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import R from '@app/assets/R'
import { colors, dimensions, fonts } from '@app/theme'

interface UserInfoProps {
  name: string
  gender: number
  year: number
  phone: number
  address: string
}

const UserInfo = (props: UserInfoProps) => {
  const { name, gender, year, phone, address } = props
  return (
    <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
      <Text style={{ ...fonts.semi_bold16, marginBottom: 20 }}>
        {R.strings().receiver_information}
      </Text>
      <Info label={R.strings().full_name} content={name} />
      <Info label={R.strings().sex} content={gender === 1 ? 'Nam' : 'Nữ'} />
      <Info label={R.strings().year_birday} content={year} />
      <Info label={R.strings().phone} content={phone} />
      <Info label={R.strings().address} content={address} />
    </View>
  )
}

const Info = ({
  label,
  content,
}: {
  label: string
  content: string | number
}) => {
  return (
    <View style={styles.v_container}>
      <View style={styles.v_row}>
        <Text style={styles.txt_label}>{label}</Text>
        <Text numberOfLines={3} style={styles.txt_content}>
          {content}
        </Text>
      </View>
      <View style={styles.v_line} />
    </View>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  v_line: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: 12,
  },
  txt_label: {
    flex: 1,
    ...fonts.regular15,
    color: '#595959',
  },
  txt_content: {
    ...fonts.regular15,
    color: colors.text,
    maxWidth: dimensions.width / 1.5,
    textAlign: 'right',
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_container: { marginBottom: 13 },
})
