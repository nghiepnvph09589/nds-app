import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import React from 'react'

const SelectSubject = ({
  data,
  value,
  onChange,
}: {
  data: { id: number; name: string }[]
  value: number[]
  onChange: (arr: number[]) => void
}) => {
  // const [value, setSelect] = useState<number[]>([])
  const onSelect = async (id: number) => {
    if (value.find((i: number) => i === id)) {
      if (value.length > 1) {
        let arrSelect: number[] = value
        let typeDelete: any = arrSelect.splice(arrSelect.indexOf(id), 1)
        let newArrSelect: any = arrSelect.map((i: number) => {
          if (i !== typeDelete) return i
        })
        await onChange(newArrSelect)
      }
    } else {
      let arrSelect: number[] = value
      arrSelect.push(id)
      let newArrSelect: any = arrSelect.map((i: number) => {
        return i
      })
      await onChange(newArrSelect)
    }
  }
  return (
    <View style={stylesSubject.ctn}>
      {data.map((item: { id: number; name: string }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onSelect(item?.id)
            }}
            style={[
              stylesSubject.btn,
              {
                borderColor: value.find((i: number) => i === item?.id)
                  ? colors.primary
                  : colors.border,
              },
            ]}
          >
            <Text
              style={{
                ...fonts.regular16,
                color: value.find((i: number) => i === item?.id)
                  ? colors.primary
                  : colors.textColor.gray8,
              }}
              children={item.name}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default SelectSubject

const stylesSubject = StyleSheet.create({
  ctn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginRight: 13,
  },
})
