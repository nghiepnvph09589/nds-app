import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '@app/theme'
import R from '@app/assets/R'
import SelectProvince from './components/SelectProvince'
import ViewBottom from '../../components/ViewBottom'
import RNTextInput from '@app/components/RNTextInput'
import SelectAddress from './components/SelectAddress'

interface CreatPostStep3Props {
  onBack: () => void
  onNext: () => void
}

const CreatePostStep3 = (props: CreatPostStep3Props) => {
  const { onBack, onNext } = props
  const [address, setAddress] = useState<string>('')
  return (
    <>
      <View style={styles.v_container}>
        <Text style={styles.txt_input_address}>
          {R.strings().input_address}
        </Text>
        <SelectProvince />
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
    paddingVertical: 20,
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
    paddingVertical: 14,
  },
})
