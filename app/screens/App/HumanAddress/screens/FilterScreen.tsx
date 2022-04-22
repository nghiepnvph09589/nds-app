/* eslint-disable no-shadow */
import DropdownBottomSheet, {
  renderButtonText,
  renderRow,
} from '@app/components/DropdownBottom'
import RNButton from '@app/components/RNButton/RNButton'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import reactotron from '@app/config/ReactotronConfig'
import { DEFAULT_PARAMS } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import HumanAddressApi from '../api/HumanAddressApi'
import { getListAddress } from '../slice/HumanAddressSlice'
const FilterScreen = () => {
  const dispatch = useDispatch()
  const [listProvince, setListProvince] = useState([])
  const [listDistrict, setListDistrict] = useState([])
  const [listWard, setListWard] = useState([])
  const [listSubject, setListSubject] = useState([])
  const [listNeeds, setListNeeds] = useState([])
  const [listGroup, setListGroup] = useState([])
  const province_id = useRef<any>(null)
  const district_id = useRef<any>(null)
  const ward_id = useRef<any>(null)
  const group_id = useRef<any>(null)
  const needs = useRef<any>([])
  const subject = useRef<any>([])

  useEffect(() => {
    getDataProvince()
    getDataListCategory()
    getDataListGroup()
  }, [])
  const getDataProvince = async () => {
    try {
      const res = await HumanAddressApi.getListProvince({})
      setListProvince(res.data)
    } catch (error) {}
  }

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

  const getDataListCategory = async () => {
    try {
      const resSubject = await HumanAddressApi.getListCategory({ type: 1 })
      const resNeeds = await HumanAddressApi.getListCategory({ type: 2 })
      setListSubject(resSubject.data)
      setListNeeds(resNeeds.data)
    } catch (error) {}
  }

  const getDataListGroup = async () => {
    try {
      const res = await HumanAddressApi.getListGroup({})
      setListGroup(res.data)
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
              defaultValue={'Tỉnh/ Thành phố'}
              renderRow={(item, index, isSelected) =>
                renderRow(item.name, index, isSelected)
              }
              containerStyle={styles.v_drop_down}
              isTextInput
              renderButtonText={item => renderButtonText(item.name)}
              onSelect={(index, item) => {
                getDataDistrict(item.id)
                province_id.current = item.id
              }}
              nameAtr="name"
              keyExtractor="id"
            />
            <DropdownBottomSheet
              isRequire
              data={listDistrict}
              defaultValue={'Quận/ Huyện'}
              renderRow={(item, index, isSelected) =>
                renderRow(item.name, index, isSelected)
              }
              isTextInput
              renderButtonText={item => renderButtonText(item.name)}
              onSelect={(index, item) => {
                getDataWard(item.id)
                district_id.current = item.id
              }}
              nameAtr="name"
              keyExtractor="id"
              containerStyle={styles.v_drop_down}
            />
            <DropdownBottomSheet
              isRequire
              data={listWard}
              defaultValue={'Xã/ Phường'}
              renderRow={(item, index, isSelected) =>
                renderRow(item.name, index, isSelected)
              }
              isTextInput
              renderButtonText={item => renderButtonText(item.name)}
              onSelect={(index, item) => {
                ward_id.current = item.id
              }}
              nameAtr="name"
              keyExtractor="id"
            />
            <Select
              onPress={item => {
                console.log(item)
                group_id.current = item[0]
              }}
              multiple={false}
              data={listGroup}
              label="Phân nhóm"
            />
            <Select
              onPress={item => {
                subject.current = item
                console.log(item)
              }}
              multiple={true}
              data={listSubject}
              label="Đối tượng"
            />
            <Select
              onPress={item => {
                needs.current = item
                console.log(item)
              }}
              multiple={true}
              data={listNeeds}
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
  onPress,
}: {
  multiple: boolean
  label: string
  data: any[]
  onPress: (item: number[]) => void
}) => {
  const [dataSelect, setDataSelect] = useState(JSON.parse(JSON.stringify(data)))
  useEffect(() => {
    setDataSelect(JSON.parse(JSON.stringify(data)))
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