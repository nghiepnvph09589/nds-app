import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { needData, subjectData } from './mockup'

import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import SelectDateBirth from './component/SelectDateBirth'
import SelectOneInTwo from './component/SelectOneInTwo'
import SelectSubject from './component/SelectSubject'
import Title from './component/Title'
import { colors } from '@app/theme'

const sexSelect = [
  {
    id: 1,
    title: R.strings().male,
  },
  {
    id: 2,
    title: R.strings().female,
  },
]

const groupTypeData = [
  {
    id: 1,
    title: R.strings().personal,
  },
  {
    id: 2,
    title: R.strings().community,
  },
]
const CreatePostStep2 = () => {
  const [name, setName] = useState<string>('')
  const [dateBirth, setDateBirth] = useState<string>('')
  const [sex, setSex] = useState<number>(0)
  const [phone, setPhone] = useState<string>('')
  const [groupType, setGroupType] = useState<number>(0)
  const [subject, setSubject] = useState<number[]>([])
  const [need, setNeed] = useState<number[]>([])
  return (
    <ScrollView style={styles.ctn} contentContainerStyle={styles.content_ctn}>
      <View>
        <Title title={R.strings().information_supporters} />
        <View style={styles.mr8}>
          <RNTextInput
            containerStyle={styles.container_input}
            errorStyle={styles.txt_error}
            returnKeyType={'next'}
            inputContainerStyle={styles.v_input}
            placeholder={R.strings().input_full_name}
            leftIcon={R.images.ic_user}
            onChangeText={(text: string) => {
              setName(text)
            }}
            value={name}
          />
          <SelectDateBirth onChange={setDateBirth} value={dateBirth} />
          <SelectOneInTwo data={sexSelect} value={sex} onSelect={setSex} />
          <RNTextInput
            containerStyle={styles.container_input}
            errorStyle={styles.txt_error}
            returnKeyType={'next'}
            inputContainerStyle={styles.v_input}
            placeholder={R.strings().phone}
            leftIcon={R.images.ic_phone}
            onChangeText={(text: string) => {
              setPhone(text)
            }}
            value={phone}
          />
        </View>
      </View>
      <View style={styles.mr13}>
        <Title title={R.strings().group_type} />
        <SelectOneInTwo
          data={groupTypeData}
          value={groupType}
          onSelect={setGroupType}
        />
      </View>
      {groupType === 1 && (
        <>
          <View style={styles.mr15}>
            <Title title={R.strings().subject} />
            <SelectSubject
              value={subject}
              onChange={setSubject}
              data={subjectData}
            />
          </View>
          <View style={styles.mr15}>
            <Title title={R.strings().need} />
            <SelectSubject value={need} data={needData} onChange={setNeed} />
          </View>
        </>
      )}
    </ScrollView>
  )
}

export default CreatePostStep2

const styles = StyleSheet.create({
  content_ctn: {
    paddingBottom: 100,
  },
  ctn: {
    backgroundColor: colors.white,
    marginTop: 1,
    padding: 15,
  },
  mr15: {
    marginTop: 15,
  },
  mr13: {
    marginTop: 13,
  },
  mr8: {
    marginTop: 8,
  },
  container_input: {
    marginTop: 15,
  },
  txt_error: {
    color: 'red',
  },
  v_input: {
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
})
