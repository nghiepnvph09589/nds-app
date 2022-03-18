import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import R from '@app/assets/R'
import SelectProvince from './components/SelectProvince'
import ViewBottom from '../../components/ViewBottom'

interface CreatPostStep3Props {
  onBack: () => void
  onNext: () => void
}
interface address {
  id: number
  name: string
}
const CreatePostStep3 = (props: CreatPostStep3Props) => {
  const { onBack, onNext } = props
  const [province, setProvince] = useState<address>({ id: 0, name: '' })
  const [district, setDistrict] = useState<address>({ id: 0, name: '' })
  const [ward, setWard] = useState<address>({ id: 0, name: '' })

  useEffect(() => {
    console.log(province, district, ward)
  }, [province, district, ward])
  return (
    <>
      <View style={styles.v_container}>
        <Text style={styles.txt_input_address}>
          {R.strings().input_address}
        </Text>
        <SelectProvince
          onProvince={setProvince}
          onDistrict={setDistrict}
          onWard={setWard}
        />
      </View>
      <ViewBottom onBack={onBack} onNext={onNext} />
    </>
  )
}

export default CreatePostStep3

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  txt_input_address: {
    ...fonts.semi_bold16,
    color: colors.text,
  },
})
