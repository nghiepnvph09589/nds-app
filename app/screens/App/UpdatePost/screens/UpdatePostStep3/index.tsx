import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import { DEFAULT_PARAMS, ROLE, STATUS_TYPE } from '@app/constant/Constant'
import { getDataListPost } from '@app/screens/App/Account/screens/ListPostUser/slice/ListPostSlice'
import { getDataListManagePost } from '@app/screens/App/Account/screens/ManageListPost/slice/ManageListPostSlice'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import UpdatePostApi from '../../api/UpdatePostApi'
import ViewBottom from '../../components/ViewBottom'
import { Media } from '../../model'
import { clearDataPost, updateDataPost } from '../../slice/UpdatePostSlice'
import SelectAddress from './components/SelectAddress'
import SelectProvince from './components/SelectProvince'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
interface CreatPostStep3Props {
  onBack: () => void
  onNext: () => void
  typeNavigate?: number
}
interface address {
  id: number
  name: string
}
const UpdatePostStep3 = (props: CreatPostStep3Props) => {
  const userInfo = useAppSelector(state => state.accountReducer).data
  const dataPost = useAppSelector(state => state.updatePostReducer)
  const lat = useRef<number>(dataPost?.lat)
  const long = useRef<number>(dataPost?.long)
  const dispatch = useDispatch()
  const { onBack, onNext, typeNavigate } = props
  const [province, setProvince] = useState<address>({
    id: dataPost.province_id,
    name: dataPost.province_name,
  })
  const [district, setDistrict] = useState<address>({
    id: dataPost.district_id,
    name: dataPost.district_name,
  })
  const [ward, setWard] = useState<address>({
    id: dataPost.ward_id,
    name: dataPost.ward_name,
  })
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false)

  useEffect(() => {
    console.log(province, district, ward)
  }, [province, district, ward])
  const [address, setAddress] = useState<string>(dataPost.address)

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
      lat: lat.current,
      long: long.current,
      new_media: dataPost.new_media.map((item: Media) => {
        return { media_url: item.media_url, type: item.type }
      }),
    }
    dispatch(updateDataPost(payload))
    if (userInfo.role === ROLE.OFFICER_PROVINCE) {
      setDatePickerVisibility(true)
    } else {
      try {
        showLoading()
        await UpdatePostApi.updatePost({ ...dataPost, ...payload })
        dispatch(clearDataPost())

        showMessages(
          R.strings().notification,
          'Bạn đã cập nhật bài viết thành công',
          () => {
            if (typeNavigate === 2) {
              dispatch(
                getDataListManagePost({
                  status: STATUS_TYPE.WAIT_CONFIRM,
                  limit: DEFAULT_PARAMS.LIMIT,
                  page: DEFAULT_PARAMS.PAGE,
                })
              )
            } else {
              dispatch(
                getDataListPost({
                  status: STATUS_TYPE.WAIT_CONFIRM,
                  limit: DEFAULT_PARAMS.LIMIT,
                  page: DEFAULT_PARAMS.PAGE,
                })
              )
            }
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
      new_media: dataPost.new_media.map((item: Media) => {
        return { media_url: item.media_url, type: item.type }
      }),
      end_date: datePicker,
    }
    dispatch(updateDataPost(payload))
    try {
      showLoading()
      await UpdatePostApi.updatePost({ ...dataPost, ...payload })
      dispatch(clearDataPost())

      showMessages(
        R.strings().notification,
        'Bạn đã cập nhật bài viết thành công',
        () => {
          if (typeNavigate === 2) {
            dispatch(
              getDataListManagePost({
                status: STATUS_TYPE.WAIT_CONFIRM,
                limit: DEFAULT_PARAMS.LIMIT,
                page: DEFAULT_PARAMS.PAGE,
              })
            )
          } else {
            dispatch(
              getDataListPost({
                status: STATUS_TYPE.WAIT_CONFIRM,
                limit: DEFAULT_PARAMS.LIMIT,
                page: DEFAULT_PARAMS.PAGE,
              })
            )
          }
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
        minimumDate={dataPost.end_date ? dataPost.end_date : new Date()}
      />
    </>
  )
}

export default UpdatePostStep3

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
