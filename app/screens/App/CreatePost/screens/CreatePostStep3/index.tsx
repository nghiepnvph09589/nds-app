import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import SelectAddress from './components/SelectAddress'
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
  const [address, setAddress] = useState<string>('')
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
          valueProvince={province}
          valueDistrict={district}
          valueWard={ward}
        />
        <RNTextInput
          containerStyle={styles.v_container_input}
          returnKeyType={'done'}
          inputContainerStyle={styles.v_input}
          placeholder={R.strings().address_detail}
          onChangeText={setAddress}
          value={address}
        />
        <SelectAddress />
      </View>
      <ViewBottom label={R.strings().post} onBack={onBack} onNext={onNext} />
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
  v_container_input: { marginTop: 20 },
  v_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 13,
  },
})
