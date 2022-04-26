/* eslint-disable no-shadow */
import DropdownBottomSheet, {
  renderButtonText,
  renderRow,
} from '@app/components/DropdownBottom'
import RNButton from '@app/components/RNButton/RNButton'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { DEFAULT_PARAMS } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import HumanAddressApi from '../api/HumanAddressApi'
import { getListAddress } from '../slice/HumanAddressSlice'

const FilterScreen = (props: any) => {
  const dispatch = useDispatch()
  const [listProvince, setListProvince] = useState(
    JSON.parse(JSON.stringify(props.route.params.listProvince))
  )
  const [listDistrict, setListDistrict] = useState(
    JSON.parse(JSON.stringify(props.route.params.listDistrict))
  )
  const [listWard, setListWard] = useState(
    JSON.parse(JSON.stringify(props.route.params.listWard))
  )

  const province_id = useRef<any>(props.route.params.province_id)
  const district_id = useRef<any>(props.route.params.district_id)
  const ward_id = useRef<any>(props.route.params.ward_id)
  const group_id = useRef<any>(props.route.params.group_id)
  const needs = useRef<any>(props.route.params.needs)
  const subject = useRef<any>(props.route.params.subject)
  const province_name = useRef<any>(props.route.params.province_name)
  const district_name = useRef<any>(props.route.params.district_name)
  const ward_name = useRef<any>(props.route.params.ward_name)

  const getDataDistrict = async (province_id: number) => {
    try {
      const res = await HumanAddressApi.getListDistrict({ province_id })
      setListDistrict(res.data)
    } catch (error) {}
  }

  const getDataWard = async (district_id: number) => {
    try {
      const res = await HumanAddressApi.getListWard({ district_id })
      setListWard(res.data)
    } catch (error) {}
  }

  const handleConfirm = () => {
    const payload = {
      page: DEFAULT_PARAMS.PAGE,
      limit: DEFAULT_PARAMS.LIMIT,
      province_id: province_id.current ? province_id.current : undefined,
      district_id: district_id.current ? district_id.current : undefined,
      ward_id: ward_id.current ? ward_id.current : undefined,
      group_id: group_id.current ? group_id.current : undefined,
      category_id: subject.current.concat(needs.current),
    }
    dispatch(getListAddress(payload))
    NavigationUtil.goBack()
    props.route.params.onCallBack({
      item: {
        province_id: province_id.current,
        district_id: district_id.current,
        ward_id: ward_id.current,
        group_id: group_id.current,
        subject: subject.current,
        needs: needs.current,
        province_name: province_name.current,
        district_name: district_name.current,
        ward_name: ward_name.current,
      },
    })
  }
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Lọc nâng cao'}
      children={
        <>
          <ScrollView style={styles.v_container}>
            <Text style={styles.txt_label}>Khu vực</Text>
            <DropdownBottomSheet
              isRequire
              data={listProvince}
              defaultValue={
                province_name.current
                  ? province_name.current
                  : 'Tỉnh/ Thành phố'
              }
              renderRow={(item, index, isSelected) =>
                renderRow(item.name, index, isSelected)
              }
              textStyle={province_id.current && { color: colors.text }}
              containerStyle={styles.v_drop_down}
              isTextInput
              renderButtonText={item => renderButtonText(item.name)}
              onSelect={(index, item) => {
                getDataDistrict(item.id)
                province_id.current = item.id
                province_name.current = item.name
              }}
              nameAtr="name"
              keyExtractor="id"
            />
            <DropdownBottomSheet
              isRequire
              data={listDistrict}
              defaultValue={
                district_name.current ? district_name.current : 'Quận/ Huyện'
              }
              textStyle={district_id.current && { color: colors.text }}
              renderRow={(item, index, isSelected) =>
                renderRow(item.name, index, isSelected)
              }
              isTextInput
              renderButtonText={item => renderButtonText(item.name)}
              onSelect={(index, item) => {
                getDataWard(item.id)
                district_id.current = item.id
                district_name.current = item.name
              }}
              nameAtr="name"
              keyExtractor="id"
              containerStyle={styles.v_drop_down}
            />
            <DropdownBottomSheet
              isRequire
              data={listWard}
              defaultValue={
                ward_name.current ? ward_name.current : 'Xã/ Phường'
              }
              textStyle={ward_id.current && { color: colors.text }}
              renderRow={(item, index, isSelected) =>
                renderRow(item.name, index, isSelected)
              }
              isTextInput
              renderButtonText={item => renderButtonText(item.name)}
              onSelect={(index, item) => {
                ward_id.current = item.id
                ward_name.current = item.name
              }}
              nameAtr="name"
              keyExtractor="id"
            />
            <Select
              dataSelected={[group_id.current]}
              onPress={item => {
                console.log(item)
                group_id.current = item[0]
              }}
              multiple={false}
              data={JSON.parse(JSON.stringify(props.route.params.listGroup))}
              label="Phân nhóm"
            />
            <Select
              dataSelected={subject.current}
              onPress={item => {
                subject.current = item
                console.log(item)
              }}
              multiple={true}
              data={JSON.parse(JSON.stringify(props.route.params.listSubject))}
              label="Đối tượng"
            />
            <Select
              dataSelected={needs.current}
              onPress={item => {
                needs.current = item
                console.log(item)
              }}
              multiple={true}
              data={JSON.parse(JSON.stringify(props.route.params.listNeeds))}
              label="Nhu cầu"
            />
          </ScrollView>
          <RNButton
            onPress={handleConfirm}
            style={styles.v_button}
            title="Xác nhận"
          />
        </>
      }
    />
  )
}

const Select = ({
  multiple,
  label,
  data,
  dataSelected,
  onPress,
}: {
  multiple: boolean
  label: string
  data: any[]
  dataSelected: any[]
  onPress: (item: number[]) => void
}) => {
  const [dataSelect, setDataSelect] = useState(JSON.parse(JSON.stringify(data)))

  useEffect(() => {
    if (data.length > 0) {
      const newData = [...data]
      dataSelected?.forEach(itemParent => {
        data.forEach((item: any, index: number) => {
          if (itemParent === item.id) {
            newData[index].isSelected = true
          }
        })
      })
      setDataSelect(JSON.parse(JSON.stringify(newData)))
    }
  }, [data])

  const handleSelect = (item: any) => {
    const newData = [...dataSelect]

    var indexCheck = newData.findIndex(value => value.id === item.id)

    newData[indexCheck].isSelected = true
    newData.forEach((value, index) => {
      if (index !== indexCheck) {
        newData[index].isSelected = false
      }
    })
    onPress([item.id])
    setDataSelect([...newData])
  }
  const handleSelectMultiple = (item: any) => {
    const newData = [...dataSelect]

    var indexCheck = newData.findIndex(value => value.id === item.id)

    newData[indexCheck].isSelected = !newData[indexCheck].isSelected
    let arraySelect: any[] = []

    newData.forEach(value => {
      if (value.isSelected) {
        arraySelect.push(value.id)
      }
    })
    onPress(arraySelect)

    setDataSelect([...newData])
  }
  return (
    <View style={styles.v_select}>
      <Text style={styles.txt_label}>{label}</Text>
      <View style={styles.v_wrap}>
        {dataSelect.map((item: any) => (
          <TouchableOpacity
            onPress={() => {
              if (multiple) {
                handleSelectMultiple(item)
              } else {
                handleSelect(item)
              }
            }}
            style={[
              styles.v_item,
              { borderColor: item.isSelected ? colors.primary : colors.border },
            ]}
          >
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...fonts.regular16,
                color: item.isSelected ? colors.primary : '#595959',
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default FilterScreen

const styles = StyleSheet.create({
  v_button: { marginHorizontal: 15 },
  v_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  v_container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  v_drop_down: {
    marginBottom: 16,
  },
  txt_label: {
    ...fonts.regular16,
    color: colors.text,
    marginBottom: 16,
    fontWeight: '500',
  },
  v_select: {
    marginTop: 20,
  },
  v_item: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
    marginRight: 12,
    marginBottom: 10,
  },
})
