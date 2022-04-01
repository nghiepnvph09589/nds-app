import R from '@app/assets/R'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage'
import { colors, dimensions, fonts, styleView } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import { getListDistrict, getListProvince, getListWard } from './api'

const tabData = [
  {
    id: 1,
    name: 'Tỉnh/ thành phố',
  },
  {
    id: 2,
    name: 'Quận/ huyện',
  },
  {
    id: 3,
    name: 'Phường/ xã',
  },
]
interface address {
  id: number
  name: string
}
interface Props {
  province: address
  district: address
  ward: address
  onProvince: React.Dispatch<React.SetStateAction<address>>
  onDistrict: React.Dispatch<React.SetStateAction<address>>
  onWard: React.Dispatch<React.SetStateAction<address>>
}
const SelectProvince = (props: Props) => {
  const { province, district, ward, onProvince, onDistrict, onWard } = props
  const [show, setShow] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<address[]>([])
  const [dataProvince, setDataProvince] = useState<address[]>([])
  const [dataDistrict, setDataDistrict] = useState<address[]>([])
  const [dataWard, setDataWard] = useState<address[]>([])

  useEffect(() => {
    if (page === 1) {
      getDataProvince()
    }
    getDataDistrictAndWard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataDistrictAndWard = async () => {
    if (district.id) {
      const res = await getListDistrict({ province_id: province.id })
      setDataDistrict(res?.data)
    }
    if (ward.id) {
      const res = await getListWard({ district_id: district.id })
      setDataWard(res?.data)
    }
  }

  const getDataProvince = async () => {
    try {
      const res = await getListProvince({})
      setDataProvince(res?.data)
      setData(res?.data)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }
  const getDataDistrict = async (id: number) => {
    try {
      const payload = {
        province_id: id,
      }
      const res = await getListDistrict(payload)
      setDataDistrict(res?.data)
      setData(res?.data)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }
  const getDataWard = async (id: number) => {
    try {
      const payload = {
        district_id: id,
      }
      const res = await getListWard(payload)
      setDataWard(res?.data)
      setData(res?.data)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }
  const onItemHeader = async (id: number) => {
    if (id === 1) {
      setPage(id)
      setData(dataProvince)
    } else if (id === 2) {
      if (province.id === 0) {
        showMessages(R.strings().notification, 'Vui lòng chọn Tỉnh/thành phố')
        return
      }
      setPage(id)
      setData(dataDistrict)
    } else if (id === 3) {
      if (district.id === 0) {
        showMessages(R.strings().notification, 'Vui lòng chọn Quận/huyện')
        return
      }
      setPage(id)
      setData(dataWard)
    }
  }
  const onRefresh = () => {
    if (page === 1) {
      getDataProvince()
    } else if (page === 2) {
      getDataDistrict(province.id)
    } else if (page === 3) {
      getDataWard(district.id)
    }
  }
  const onItem = async (item: address) => {
    if (page === 1) {
      onProvince({
        id: item.id,
        name: item.name,
      })
      if (item.id !== province.id) {
        onDistrict({
          id: 0,
          name: '',
        })
        onWard({
          id: 0,
          name: '',
        })
      }
      setPage(2)
      getDataDistrict(item.id)
    } else if (page === 2) {
      onDistrict({
        id: item.id,
        name: item.name,
      })
      if (item.id === district.id) {
        onWard({
          id: 0,
          name: '',
        })
      }
      getDataWard(item.id)
      setPage(3)
    } else if (page === 3) {
      onWard({
        id: item.id,
        name: item.name,
      })
    }
  }
  const onConfirm = () => {
    if (province.id === 0) {
      showMessages(R.strings().notification, 'Vui lòng chọn Tỉnh/thành phố')
      return
    }
    if (district.id === 0) {
      showMessages(R.strings().notification, 'Vui lòng chọn Quận/huyện')
      return
    }
    if (ward.id === 0) {
      showMessages(R.strings().notification, 'Vui lòng chọn Phường/xã')
      return
    }
    setShow(false)
    onProvince({ ...province })
    onDistrict({ ...district })
    onWard({ ...ward })
  }
  const onCancel = () => {
    onProvince({
      ...province,
    })
    onDistrict({
      ...district,
    })
    onWard({
      ...ward,
    })
    setShow(false)
  }
  const value = () => {
    if (page === 1) {
      return province
    } else if (page === 2) {
      return district
    } else if (page === 3) {
      return ward
    }
  }

  const renderValue = () => {
    if (province?.id !== 0 && district?.id !== 0 && ward?.id !== 0) {
      return `${ward?.name}, ${district?.name}, ${province?.name} `
    } else {
      return null
    }
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShow(true)
        }}
        style={styles.input}
      >
        <Text
          style={[
            styles.placeholder,
            // eslint-disable-next-line react-native/no-inline-styles
            { color: renderValue() ? colors.textColor.gray9 : '#8898A7' },
          ]}
          children={renderValue() ? renderValue() : 'Chọn địa chỉ'}
        />
        <FstImage source={R.images.ic_down} style={styles.ic_down} />
      </TouchableOpacity>
      <Modal
        onBackdropPress={() => {
          setShow(false)
        }}
        isVisible={show}
      >
        <View style={styles.ctn_modal}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{}}
          >
            {tabData.map((item: { id: number; name: string }) => {
              return (
                <ItemHeader
                  item={item}
                  page={page}
                  onPress={() => {
                    onItemHeader(item?.id)
                  }}
                />
              )
            })}
          </ScrollView>
          <FlatList
            style={styles.flatlist}
            data={data}
            onRefresh={onRefresh}
            refreshing={false}
            onEndReachedThreshold={0.05}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: { item: address; index: number }) => (
              <Item
                item={item}
                index={index}
                onPress={() => {
                  onItem(item)
                }}
                value={value()}
              />
            )}
            keyExtractor={(_, index) => `${index}`}
            ListEmptyComponent={() => (
              <Empty description={'Danh sách trống'} marginTop={5} />
            )}
          />
          <View style={styles.v_bottom}>
            <TouchableOpacity
              onPress={onCancel}
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                { borderRightWidth: 1, borderColor: '#868E96' },
              ]}
            >
              <Text style={styles.txt_btn} children={'Hủy'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.btn}>
              <Text style={styles.txt_btn} children={'Xác nhận'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}
const Item = ({
  item,
  index,
  onPress,
  value,
}: {
  item: address
  index: number
  onPress: () => void
  value: any
}) => {
  return (
    <TouchableOpacity onPress={onPress} key={index} style={styles.item_address}>
      <Text
        style={{
          ...fonts.regular17,
          color:
            value.id === item?.id ? colors.primary : colors.textColor.gray9,
        }}
        children={item.name}
      />
    </TouchableOpacity>
  )
}

const ItemHeader = ({
  item,
  page,
  onPress,
}: {
  item: address
  page: number
  onPress: () => void
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item_head,
        {
          borderBottomColor: page === item?.id ? colors.primary : colors.white,
        },
      ]}
    >
      <Text
        style={{
          color: page === item?.id ? colors.primary : colors.textColor.gray8,
          ...fonts.regular14,
        }}
        children={item.name}
      />
    </TouchableOpacity>
  )
}

export default SelectProvince

const styles = StyleSheet.create({
  input: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  placeholder: {
    ...fonts.regular16,
    flex: 1,
  },
  ic_down: {
    width: 24,
    height: 24,
  },
  ctn_modal: {
    paddingTop: 10,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  flatlist: {
    height: dimensions.height * 0.5 - 50,
  },
  item_head: {
    paddingHorizontal: 11,
    paddingVertical: 15,
    borderBottomWidth: 2,
  },
  item_address: {
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: colors.border,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
  },
  txt_btn: {
    ...fonts.regular16,
    color: colors.textColor.gray9,
  },
  v_bottom: {
    paddingVertical: 12,
    ...styleView.rowItem,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
})
