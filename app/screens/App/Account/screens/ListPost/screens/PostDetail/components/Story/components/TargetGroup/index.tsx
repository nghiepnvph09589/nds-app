import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '@app/theme'

const data = ['Người khuyết tật', 'Người nghèo']

const TargetGroup = () => {
  return (
    <View style={{ marginHorizontal: 15 }}>
      <Text style={{ ...fonts.semi_bold16, color: colors.text }}>
        Nhóm đối tượng
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
        {data.map((item: string) => {
          return (
            <View
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: 6,
                paddingHorizontal: 12,
                marginRight: 12,
                marginBottom: 16,
              }}
            >
              <Text style={{ ...fonts.regular16, color: '#595959' }}>
                {item}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default TargetGroup

const styles = StyleSheet.create({})
