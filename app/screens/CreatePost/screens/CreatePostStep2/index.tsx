import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import { NAME_REGEX, PHONE_REGEX } from '@app/constant/Constant'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import ViewBottom from '../../components/ViewBottom'
import { updateDataCreatePost } from '../../slice/CreatePostSlice'
import { getListSubject, getListTypeGroup } from './api'
import SelectDateBirth from './component/SelectDateBirth'
import SelectOneInTwo from './component/SelectOneInTwo'
import SelectSubject from './component/SelectSubject'
import Title from './component/Title'

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
  const dispatch = useDispatch()
  const { onBack, onNext } = props
  const [dataTypeGroup, setDataTypeGroup] = useState<any>([])
  const [dataSubject, setDataSubject] = useState<any>([])
  const [dataNeed, setDataNeed] = useState<any>([])
  const year_of_birth = useRef<string>('')
  const [sex, setSex] = useState<number>(0)
  const [groupType, setGroupType] = useState<number>(0)
  const [subject, setSubject] = useState<number[]>([])
  const [need, setNeed] = useState<number[]>([])

  const dataCreatPost = useAppSelector(state => state.creatPostReducer)

  useEffect(() => {
    if (dataCreatPost.title === '') {
      year_of_birth.current = ''
      setSex(0)
      setGroupType(0)
      setSubject([0])
      setNeed([0])
    }
  }, [dataCreatPost])

  const getDataTypeGroup = async () => {
    showLoading()
    try {
      const res = await getListTypeGroup({})
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
        setSubject([])
        setNeed([])
        setDataSubject(res?.data)
      } else if (type === 2) {
        setSubject([])
        setNeed([])
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

  const Schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(NAME_REGEX, R.strings().validateEmail)
      .required(R.strings().name_blank),
    phone: Yup.string()
      .matches(PHONE_REGEX, R.strings().validatePhone)
      .min(10, R.strings().validatePhone)
      .max(11, R.strings().validatePhone)
      .required(R.strings().phone_blank),
  })

  const onNextStep2 = (value: { phone: string; name: string }) => {
    if (sex === 0) {
      showMessages(R.strings().notification, 'Vui lòng chọn giới tính')
      return
    }
    if (!year_of_birth.current) {
      showMessages(R.strings().notification, 'Vui lòng chọn ngày sinh')
      return
    }
    if (subject.length === 0) {
      showMessages(R.strings().notification, 'Vui lòng chọn đối tượng')
      return
    }
    if (need.length === 0) {
      showMessages(R.strings().notification, 'Vui lòng chọn nhu cầu')
      return
    }
    const newNeed = need.map((item: number) => ({
      category_id: item,
      type: 2,
    }))
    const newSubject = subject.map((item: number) => ({
      category_id: item,
      type: 1,
    }))
    const payload = {
      name: value.name,
      phone: value.phone,
      gender: sex,
      year_of_birth: year_of_birth.current,
      group_id: groupType,
      category: newSubject.concat(newNeed),
    }
    dispatch(updateDataCreatePost(payload))
    onNext()
  }
  return (
    <>
      <Formik
        initialValues={{ name: '', phone: '' }}
        onSubmit={onNextStep2}
        validationSchema={Schema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setSubmitting,
          values,
          errors,
          touched,
        }) => (
          <>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="always"
              style={styles.ctn}
              contentContainerStyle={styles.content_ctn}
            >
              <View>
                <Title title={R.strings().information_supporters} />
                <View style={styles.mr8}>
                  <RNTextInput
                    containerStyle={styles.container_input}
                    errorStyle={styles.txt_error}
                    returnKeyType={'next'}
                    inputContainerStyle={styles.v_input}
                    placeholder={R.strings().full_name}
                    leftIcon={R.images.ic_user}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    onSubmitEditing={() => setSubmitting(true)}
                    value={values.name}
                    errorMessage={errors.name}
                    touched={touched.name}
                    maxLength={255}
                  />
                  <SelectDateBirth
                    onChange={(year: string) => (year_of_birth.current = year)}
                  />
                  <SelectOneInTwo
                    data={sexSelect}
                    value={sex}
                    onSelect={setSex}
                  />
                  <RNTextInput
                    containerStyle={styles.container_input}
                    errorStyle={styles.txt_error}
                    placeholder={R.strings().phone}
                    inputContainerStyle={styles.v_input}
                    returnKeyType={'next'}
                    leftIcon={R.images.ic_phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    onSubmitEditing={() => setSubmitting(true)}
                    value={values.phone}
                    errorMessage={errors.phone}
                    touched={touched.phone}
                    keyboardType="number-pad"
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
                    <SelectSubject
                      value={need}
                      data={dataNeed}
                      onChange={setNeed}
                    />
                  </View>
                )}
              </>
            </KeyboardAwareScrollView>
            <ViewBottom onBack={onBack} onNext={handleSubmit} />
          </>
        )}
      </Formik>
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
