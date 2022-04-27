/* eslint-disable react-hooks/rules-of-hooks */
import R from '@app/assets/R'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import {
  DEFAULT_PARAMS,
  MEDIA_TYPE,
  SCREEN_ROUTER_APP,
} from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import HumanAddressApi from './api/HumanAddressApi'
import { HumanAddressType } from './model'
import { getListAddress } from './slice/HumanAddressSlice'

const dataFilter = [
  { title: 'Khu vực', id: 1 },
  { title: 'Phân nhóm', id: 2 },
  { title: 'Đối tượng', id: 3 },
  { title: 'Nhu cầu', id: 4 },
]
const HumanAddress = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, data, isLastPage, isLoadMore } = useAppSelector(
    state => state.humanAddressReducer
  )
  const [body, setBody] = useState({
    page: DEFAULT_PARAMS.PAGE,
    limit: DEFAULT_PARAMS.LIMIT,
  })
  const [dataSelect, setDataSelect] = useState<any>([])

  const listProvince = useRef<any>([])
  const listDistrict = useRef<any>([])
  const listWard = useRef<any>([])
  const listSubject = useRef<any>([])
  const listNeeds = useRef<any>([])
  const listGroup = useRef<any>([])

  const province_id = useRef<any>(null)
  const district_id = useRef<any>(null)
  const ward_id = useRef<any>(null)
  const group_id = useRef<any>(null)
  const needs = useRef<any>([])
  const subject = useRef<any>([])
  const province_name = useRef<any>('')
  const district_name = useRef<any>('')
  const ward_name = useRef<any>('')
  const [isOpened, setIsOpened] = useState(false)
  const [idSelect, setIdSelect] = useState(0)

  useEffect(() => {
    getDataListAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])

  useEffect(() => {
    getDataProvince()
    getDataListCategory()
    getDataListGroup()
  }, [])

  const getDataProvince = async () => {
    try {
      const res = await HumanAddressApi.getListProvince({})
      listProvince.current = res.data
    } catch (error) {}
  }

  const getDataListCategory = async () => {
    try {
      const resSubject = await HumanAddressApi.getListCategory({ type: 1 })
      const resNeeds = await HumanAddressApi.getListCategory({ type: 2 })
      listSubject.current = resSubject.data
      listNeeds.current = resNeeds.data
    } catch (error) {}
  }

  const getDataListGroup = async () => {
    try {
      const res = await HumanAddressApi.getListGroup({})
      listGroup.current = res.data
    } catch (error) {}
  }

  const getDataListAddress = () => {
    dispatch(getListAddress(body))
  }

  var onEndReachedCalledDuringMomentum = true

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !isLastPage && !isLoadMore) {
      setBody({
        ...body,
        page: body.page + 1,
      })
    }
  }

  const onRefreshData = () => {
    setBody({
      ...body,
      page: DEFAULT_PARAMS.PAGE,
    })
  }

  const onUpdateDate = ({ item }: { item: any }) => {
    province_id.current = item.province_id
    district_id.current = item.district_id
    ward_id.current = item.ward_id
    group_id.current = item.group_id
    needs.current = item.needs
    subject.current = item.subject
    province_name.current = item.province_name
    district_name.current = item.district_name
    ward_name.current = item.ward_name
  }

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  // if (isError) return <Error reload={() => {}} />

  const renderItem = useCallback(({ item }: { item: HumanAddressType }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_POST, {
            id: item.id,
          })
        }}
        style={styles.v_item}
      >
        <FstImage
          resizeMode="cover"
          style={styles.img_post}
          source={
            item?.DonateRequestMedia[0]?.type === MEDIA_TYPE.IMAGE
              ? { uri: item?.DonateRequestMedia[0]?.media_url }
              : R.images.img_red_cross
          }
        />
        <View style={styles.v_content}>
          <Text numberOfLines={2} style={styles.txt_title}>
            {item?.title}
          </Text>
          <Text numberOfLines={1} style={styles.txt_content2}>
            {item?.content}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }, [])

  const keyExtractor = useCallback((item: HumanAddressType) => `${item.id}`, [])

  const onPressFilter = (item: any) => {
    if (item.id !== idSelect) {
      if (item.id === 2) {
        setDataSelect(JSON.parse(JSON.stringify(listGroup.current)))
        setIdSelect(item.id)
      }
      if (item.id === 3) {
        setDataSelect(JSON.parse(JSON.stringify(listSubject.current)))
        setIdSelect(item.id)
      }
      if (item.id === 4) {
        setDataSelect(JSON.parse(JSON.stringify(listNeeds.current)))
        setIdSelect(item.id)
      }

      if (item.id !== 1) {
        setIsOpened(true)
      }
    } else {
      setIsOpened(false)
      setIdSelect(0)
    }
  }

  const handleItemSelect = (item: any) => {
    if (idSelect !== 1) {
      const newData = [...dataSelect]

      var indexCheck = newData.findIndex(value => value.id === item.id)

      newData[indexCheck].isSelected = !newData[indexCheck].isSelected
      if (idSelect === 2) {
        newData.forEach((value, index) => {
          if (index !== indexCheck) {
            newData[index].isSelected = false
          }
        })
      }

      let arraySelect: any[] = []

      newData.forEach(value => {
        if (value.isSelected) {
          arraySelect.push(value.id)
        }
      })
      if (idSelect === 2) {
        listGroup.current = [...newData]
        group_id.current = arraySelect.length > 0 ? arraySelect[0] : null
      } else if (idSelect === 3) {
        listSubject.current = [...newData]
        subject.current = arraySelect
      } else if (idSelect === 4) {
        listNeeds.current = [...newData]
        needs.current = arraySelect
      }
      setDataSelect([...newData])
    }
  }

  const onPressButtonReset = () => {
    const newData = [...dataSelect]

    newData.forEach((value, index) => {
      newData[index].isSelected = false
    })

    if (idSelect === 2) {
      listGroup.current = [...newData]
      group_id.current = null
    } else if (idSelect === 3) {
      listSubject.current = [...newData]
      subject.current = []
    } else if (idSelect === 4) {
      listNeeds.current = [...newData]
      needs.current = []
    }
    setDataSelect([...newData])
  }

  const onPressButtonApply = () => {
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
    setIsOpened(false)
    setIdSelect(0)
  }

  return (
    <ScreenWrapper
      back
      rightComponent={
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.FILTER, {
              province_id: province_id.current,
              district_id: district_id.current,
              ward_id: ward_id.current,
              group_id: group_id.current,
              needs: needs.current,
              subject: subject.current,
              province_name: province_name.current,
              district_name: district_name.current,
              ward_name: ward_name.current,
              listProvince: listProvince.current,
              listDistrict: listDistrict.current,
              listWard: listWard.current,
              listSubject: listSubject.current,
              listNeeds: listNeeds.current,
              listGroup: listGroup.current,
              onCallBack: onUpdateDate,
            })
          }}
          style={styles.v_row2}
        >
          <Text style={styles.txt_filter2}>Lọc</Text>
          <FstImage style={styles.ic_filter} source={R.images.ic_filter} />
        </TouchableOpacity>
      }
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().human_address}
      children={
        <>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.v_scroll}
          >
            {dataFilter?.map(
              (item: { title: string; id: number }, i: number) => (
                <TouchableOpacity
                  onPress={() => {
                    onPressFilter(item)
                  }}
                  key={i}
                  style={styles.v_item_scroll}
                >
                  <Text style={styles.txt_filter}>{item.title}</Text>
                  <FstImage
                    resizeMode="contain"
                    style={styles.ic_arrow}
                    source={
                      idSelect === item.id
                        ? R.images.ic_arrow_up
                        : R.images.ic_arrow_down
                    }
                  />
                </TouchableOpacity>
              )
            )}
          </ScrollView>
          <View style={styles.v_line} />

          <View style={styles.v_list}>
            <View style={styles.v_row}>
              <FstImage style={styles.image} source={R.images.ic_annotation} />
              <Text style={styles.txt_count_address}>11 địa điểm nhân đạo</Text>
            </View>
            <FlatList
              onRefresh={onRefreshData}
              refreshing={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={onMomentumScrollBegin}
              onEndReached={handleLoadMore}
              ListFooterComponent={
                isLoadMore ? (
                  <ActivityIndicator
                    color={colors.colorDefault.placeHolder}
                    style={styles.v_load_more}
                  />
                ) : null
              }
              ListEmptyComponent={<Empty description={'Danh sách rỗng'} />}
            />
          </View>
          {isOpened && (
            <View style={styles.v_shadow}>
              <ScrollView style={styles.v_select}>
                {dataSelect.map((item: any) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        handleItemSelect(item)
                      }}
                      style={styles.v_item_select}
                    >
                      <Text style={styles.text}>{item?.name}</Text>
                      {item.isSelected && (
                        <FstImage
                          style={styles.icon_check}
                          source={R.images.ic_check}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </>
                ))}
              </ScrollView>
              <View style={styles.v_bottom}>
                <TouchableOpacity
                  onPress={onPressButtonReset}
                  style={styles.button}
                >
                  <Text style={styles.txt_button}>Đặt lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressButtonApply}
                  style={[styles.button, { backgroundColor: colors.primary }]}
                >
                  <Text style={[styles.txt_button, { color: colors.white }]}>
                    Áp dụng
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      }
    />
  )
}

export default HumanAddress

const styles = StyleSheet.create({
  icon_check: {
    width: 20,
    height: 20,
  },
  txt_button: {
    ...fonts.regular16,
    fontWeight: '500',
    color: colors.primary,
  },
  button: {
    paddingVertical: 8,
    width: (dimensions.width - 43) / 2,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: colors.border,
  },
  text: {
    ...fonts.regular16,
    color: colors.text,
    fontWeight: '400',
    flex: 1,
  },
  v_bottom: {
    backgroundColor: 'white',
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  v_select: {
    backgroundColor: 'white',
    maxHeight: '50%',
    paddingHorizontal: 15,
  },
  v_item_select: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  v_shadow: {
    top: 42,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  txt_content2: { ...fonts.regular16, color: '#595959' },
  txt_title: {
    ...fonts.regular16,
    color: colors.text,
    fontWeight: '500',
    marginTop: 3,
  },
  txt_filter2: {
    ...fonts.regular14,
    color: colors.primary,
    marginRight: 4,
  },
  v_row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ic_filter: {
    width: 24,
    height: 24,
  },
  v_list: {
    flex: 1,
  },
  v_content: { flex: 1, marginLeft: 16, justifyContent: 'space-between' },
  img_post: { width: 80, height: 80, borderRadius: 8 },
  v_item: {
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
  },
  txt_count_address: {
    ...fonts.regular15,
    color: colors.text,
    marginLeft: 8,
  },
  image: {
    width: 24,
    height: 24,
  },
  v_scroll: {
    maxHeight: 35,
    paddingHorizontal: 5,
  },
  v_item_scroll: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  txt_filter: {
    ...fonts.regular15,
    color: '#595959',
    marginRight: 5,
  },
  ic_arrow: {
    width: 20,
    height: 20,
  },
  v_line: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: 5,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingLeft: 15,
  },
  v_load_more: {
    marginVertical: 15,
  },
})
