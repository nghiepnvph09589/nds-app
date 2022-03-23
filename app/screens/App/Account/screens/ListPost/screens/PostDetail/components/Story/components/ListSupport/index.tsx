import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@app/theme'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'

const ListSupport = () => {
  return (
    <View style={styles.v_container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FstImage
          style={{ width: 32, height: 32 }}
          source={R.images.ic_heart2}
        />
        <View style={{ marginLeft: 18 }}>
          <Text>Danh sách ủng hộ</Text>
          <Text>Lượt ủng hộ 3</Text>
        </View>
      </View>
    </View>
  )
}

export default ListSupport

const styles = StyleSheet.create({
  v_container: {
    marginHorizontal: 15,
    marginTop: 16,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
  },
})
