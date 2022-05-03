import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import { DEFAULT_PARAMS, ROLE } from '@app/constant/Constant'
import { getDataListPost } from '@app/screens/App/Account/screens/ListPostUser/slice/ListPostSlice'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useState, useRef } from 'react'
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
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
interface CreatPostStep3Props {
  onBack: () => void
  onNext: () => void
}
interface address {
  id: number
  name: string
}
const CreatePostStep3 = (props: CreatPostStep3Props) => {
  //const location = useAppSelector(state => state.locationReducer)
  const dataCreatPost = useAppSelector(state => state.creatPostReducer)
  const userInfo = useAppSelector(state => state.accountReducer).data
  const dispatch = useDispatch()
  const { onBack, onNext } = props
  const [province, setProvince] = useState<address>({ id: 0, name: '' })
  const [district, setDistrict] = useState<address>({ id: 0, name: '' })
  const [ward, setWard] = useState<address>({ id: 0, name: '' })
  const lat = useRef<number | null>(null)
  const long = useRef<number | null>(null)

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false)

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

    if (!long.current) {
      showMessages(R.strings().notification, 'Vui lòng chọn địa chỉ chi tiết')
      return
    }

    if (userInfo.role === ROLE.OFFICER_PROVINCE) {
      setDatePickerVisibility(true)
    } else {
      const payload = {
        province_id: province.id,
        district_id: district.id,
        ward_id: ward.id,
        address,
        lat: lat.current,
        long: long.current,
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
            dispatch(
              getDataListPost({
                status: 2,
                limit: DEFAULT_PARAMS.LIMIT,
                page: DEFAULT_PARAMS.PAGE,
              })
            )
            onNext()
          }
        )
      } catch (error) {
      } finally {
        hideLoading()
      }
    }
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = async (date: Date) => {
    const datePicker = moment(date)
      .add(2, 'day')
      .startOf('day')
      .toISOString()
      .replace(/T.*/gi, 'T00:00:00.000Z')
    // end_date.current = datePicker
    setDatePickerVisibility(false)
    const payload = {
      province_id: province.id,
      district_id: district.id,
      ward_id: ward.id,
      address,
      lat: lat.current,
      long: long.current,
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
          dispatch(
            getDataListPost({
              status: 2,
              limit: DEFAULT_PARAMS.LIMIT,
              page: DEFAULT_PARAMS.PAGE,
            })
          )
          onNext()
        }
      )
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  const onSaveDataLocation = ({ lt, lng }: { lt: number; lng: number }) => {
    console.log(lng, lt)
    lat.current = lt
    long.current = lng
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
        <SelectAddress onSaveDataLocation={onSaveDataLocation} />
      </View>
      <ViewBottom label={R.strings().post} onBack={onBack} onNext={onPost} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="vi"
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Hủy"
        customHeaderIOS={() => (
          <Text style={styles.txt_date_expire}>Ngày hết hạn đăng tin</Text>
        )}
        minimumDate={new Date()}
      />
    </>
  )
}

export default CreatePostStep3

const styles = StyleSheet.create({
  txt_date_expire: {
    alignSelf: 'center',
    ...fonts.regular16,
    fontWeight: '500',
    marginTop: 20,
  },
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
