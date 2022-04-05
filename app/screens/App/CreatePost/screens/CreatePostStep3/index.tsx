import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import { ROLE } from '@app/constant/Constant'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CreatePostApi from '../../api/CreatePostApi'
import ViewBottom from '../../components/ViewBottom'
import {
  clearDataCreatePost,
  updateDataCreatePost,
} from '../../slice/CreatePostSlice'
import SelectAddress from './components/SelectAddress'
import SelectProvince from './components/SelectProvince'

interface CreatPostStep3Props {
  onBack: () => void
  onNext: () => void
}
interface address {
  id: number
  name: string
}
const CreatePostStep3 = (props: CreatPostStep3Props) => {
  const { lat, long } = useAppSelector(state => state.locationReducer)
  const dataCreatPost = useAppSelector(state => state.creatPostReducer)
  const userInfo = useAppSelector(state => state.accountReducer).data
  const dispatch = useDispatch()
  const { onBack, onNext } = props
  const [province, setProvince] = useState<address>({ id: 0, name: '' })
  const [district, setDistrict] = useState<address>({ id: 0, name: '' })
  const [ward, setWard] = useState<address>({ id: 0, name: '' })

  useEffect(() => {
    console.log(province, district, ward)
  }, [province, district, ward])
  const [address, setAddress] = useState<string>('')

  const onPost = async () => {
    if (!(province.id !== 0 && district.id !== 0 && ward.id !== 0)) {
      showMessages(
        R.strings().notification,
        'Vui lòng cập nhật Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã'
      )
      return
    }
    if (!address) {
      showMessages(
        R.strings().notification,
        'Vui lòng cập nhật tên đường, số nhà, tòa nhà'
      )
      return
    }
    const payload = {
      province_id: province.id,
      district_id: district.id,
      ward_id: ward.id,
      address,
      lat: lat,
      long: long,
    }
    dispatch(updateDataCreatePost(payload))
    try {
      showLoading()
      await CreatePostApi.createPost({ ...dataCreatPost, ...payload })
      dispatch(clearDataCreatePost())
      showMessages(
        R.strings().notification,
        userInfo.role === ROLE.OFFICER_PROVINCE
          ? 'Bạn đã đăng bài thành công'
          : 'Cảm ơn bạn đã đăng bài. Chúng tôi sẽ gửi lại thông báo khi bài của bạn được phê duyệt.',
        () => {
          onNext()
        }
      )
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <View style={styles.v_container}>
        <Text style={styles.txt_input_address}>
          {R.strings().input_address}
        </Text>
        <SelectProvince
          province={province}
          district={district}
          ward={ward}
          onProvince={setProvince}
          onDistrict={setDistrict}
          onWard={setWard}
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
      <ViewBottom label={R.strings().post} onBack={onBack} onNext={onPost} />
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
