import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { getListSubject, getListTypeGroup } from './api'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import SelectDateBirth from './component/SelectDateBirth'
import SelectOneInTwo from './component/SelectOneInTwo'
import SelectSubject from './component/SelectSubject'
import { Text } from 'react-native-elements'
import Title from './component/Title'
import ViewBottom from '../../components/ViewBottom'
import { colors } from '@app/theme'

const sexSelect = [
  {
    id: 1,
    name: R.strings().male,
  },
  {
    id: 2,
    name: R.strings().female,
  },
]

// const groupTypeData = [
//   {
//     id: 1,
//     name: R.strings().personal,
//   },
//   {
//     id: 2,
//     name: R.strings().community,
//   },
// ]

interface CreatPostStep2Props {
  onBack: () => void
  onNext: () => void
}
const CreatePostStep2 = (props: CreatPostStep2Props) => {
  const { onBack, onNext } = props
  const [dataTypeGroup, setDataTypeGroup] = useState<any>([])
  const [dataSubject, setDataSubject] = useState<any>([])
  const [dataNeed, setDataNeed] = useState<any>([])

  const [name, setName] = useState<string>('')
  const [dateBirth, setDateBirth] = useState<string>('')
  const [sex, setSex] = useState<number>(0)
  const [phone, setPhone] = useState<string>('')
  const [groupType, setGroupType] = useState<number>(0)
  const [subject, setSubject] = useState<number[]>([])
  const [need, setNeed] = useState<number[]>([])

  const getDataTypeGroup = async () => {
    showLoading()
    try {
      const payload = {}
      const res = await getListTypeGroup(payload)
      await setDataTypeGroup(res?.data)
    } catch (error) {
      console.error(error)
    } finally {
      hideLoading()
    }
  }

  const getDataSubject = async (groupId: number, type: number) => {
    showLoading()
    try {
      const payload = {
        group_id: groupId,
        type: type,
      }
      const res = await getListSubject(payload)
      if (type === 1) {
        setDataSubject(res?.data)
      } else if (type === 2) {
        setDataNeed(res?.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      hideLoading()
    }
  }

  useEffect(() => {
    getDataTypeGroup()
  }, [])
  useEffect(() => {
    if (groupType !== 0) {
      getDataSubject(groupType, 1)
      getDataSubject(groupType, 2)
    }
  }, [groupType])
  const onOk = () => {
    console.log(name, dateBirth, sex, phone, groupType, subject, need)
  }
  return (
    <>
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
            data={dataTypeGroup}
            value={groupType}
            onSelect={setGroupType}
          />
        </View>
        <>
          {dataSubject.length !== 0 && (
            <View style={styles.mr15}>
              <Title title={R.strings().subject} />
              <SelectSubject
                value={subject}
                onChange={setSubject}
                data={dataSubject}
              />
            </View>
          )}
          {dataNeed.length !== 0 && (
            <View style={styles.mr15}>
              <Title title={R.strings().need} />
              <SelectSubject value={need} data={dataNeed} onChange={setNeed} />
            </View>
          )}
        </>
        <TouchableOpacity onPress={onOk}>
          <Text>ok</Text>
        </TouchableOpacity>
      </ScrollView>
      <ViewBottom onBack={onBack} onNext={onNext} />
    </>
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
    flex: 1,
  },
  mr15: {
    marginTop: 15,
  },
  mr13: {
    marginTop: 14,
  },
  mr8: {
    marginTop: 8,
  },
  container_input: {
    marginTop: 16,
  },
  txt_error: {
    color: 'red',
  },
  v_input: {
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
})
