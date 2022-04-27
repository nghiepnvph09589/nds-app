import R from '@app/assets/R'
import { ActionSheet, ActionSheetRef } from '@app/components/ActionSheet'
import Error from '@app/components/Error/Error'
import {
  DEFAULT_PARAMS,
  ROLE,
  SCREEN_ROUTER_APP,
  STATUS_TYPE,
} from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import PostImageArea from '@app/screens/App/Home/components/ListPost/components/PostImageArea'
import { getDataHome } from '@app/screens/App/Home/slice/HomeSlice'
import { updateDataPost } from '@app/screens/App/UpdatePost/slice/UpdatePostSlice'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { showConfirm } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import moment from 'moment'
import 'moment/locale/vi'
import { Tab, Tabs } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text } from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useDispatch } from 'react-redux'
import { getDataListManagePost } from '../ManageListPost/slice/ManageListPostSlice'
import PostDetailApi from './api/PostDetailApi'
import BankInfo from './components/BankInfo'
import ButtonBack from './components/ButtonBack'
import ModalDeny from './components/ModalDeny'
import Story from './components/Story'
import ViewBottom from './components/ViewBottom'
import ViewBottom2 from './components/ViewBottom2'
import ViewStatus from './components/ViewStatus'
import {
  DonateCategoryDetails,
  DonateRequestMedia,
  PostDetailData,
} from './model'

interface PostDetailProps {
  route: {
    params: {
      id: number
      status: number
      type?: number
      endDate: Date | undefined
      typeNavigate?: number
    }
  }
}

const PostDetail = (props: PostDetailProps) => {
  const dispatch = useDispatch()
  const userInfo = useAppSelector(state => state.accountReducer).data
  const { id, status, type, endDate, typeNavigate } = props.route.params
  const [isError, setIsError] = useState<boolean>(false)
  const ref = React.useRef<ActionSheetRef>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [dataPostDetail, setDataPostDetail] = useState<PostDetailData>({
    id: 0,
    title: '',
    content: '',
    address: '',
    address_google: '',
    long: 0,
    lat: 0,
    province_id: 0,
    district_id: 0,
    ward_id: 0,
    user_id: 0,
    group_id: 0,
    name: '',
    phone: 0,
    gender: 1,
    year_of_birth: 0,
    reason: '',
    status: 3,
    is_update: 0,
    group_name: 0,
    DonateRequestMedia: [],
    DonateCategoryDetails: [],
    BankInfos: [],
    DFProvince: {
      id: 0,
      name: '',
      value: '',
    },
    DFDistrict: {
      id: 0,
      name: '',
      value: '',
    },
    DFWard: {
      id: 0,
      name: '',
      value: '',
    },
  })
  const [typeOption, setTypeOption] = useState<number>(1)
  const [inputText, setInputText] = useState<string>('')
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false)
  const end_date = useRef<Date | undefined>(endDate)

  useEffect(() => {
    getDataPostDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataPostDetail = async () => {
    showLoading()
    try {
      const res = await PostDetailApi.getPostDetail({ id })
      setIsError(false)
      setDataPostDetail(res.data)
      end_date.current = res.data.end_date
    } catch (error) {
      setIsError(true)
    } finally {
      hideLoading()
    }
  }

  const handleApprove = async () => {
    if (typeNavigate === 3) {
      if (
        (dataPostDetail.is_update === 1 || dataPostDetail.is_update === 2) &&
        userInfo.role === ROLE.CUSTOMER
      ) {
        onUpdateDataPostToReducer()
        return
      } else if (
        dataPostDetail.is_update === 1 &&
        userInfo.role === ROLE.OFFICER_PROVINCE
      ) {
        onUpdateDataPostToReducer()
        return
      } else if (
        dataPostDetail.status === 3 &&
        userInfo.role === ROLE.OFFICER_PROVINCE
      ) {
        onUpdateDataPostToReducer()
        return
      } else {
        if (!end_date.current && userInfo.role === ROLE.OFFICER_PROVINCE) {
          showDatePicker()
        }
      }
    }
    if (
      typeNavigate === 2 &&
      userInfo.role === ROLE.OFFICER_DISTRICT &&
      type === STATUS_TYPE.EDIT &&
      dataPostDetail.is_update === 2
    ) {
      setTypeOption(3)
      setTimeout(() => {
        setIsVisible(!isVisible)
      }, 1000)
      return
    }
    if (typeNavigate === 1) {
      onUpdateDataPostToReducer()
    } else if (type === STATUS_TYPE.COMPLETE) {
      onUpdateDataPostToReducer()
    } else if (userInfo.role === ROLE.OFFICER_DISTRICT && status === 2) {
      onUpdateDataPostToReducer()
    } else if (!endDate && userInfo.role === ROLE.OFFICER_PROVINCE) {
      showDatePicker()
    } else {
      showConfirm(
        R.strings().notification,
        'Bạn có chắc chắn muốn duyệt tin này',
        async () => {
          showLoading()
          try {
            await PostDetailApi.approvePost({
              id,
              reason: '',
              end_date: end_date.current ? end_date.current : '',
            })
            if (userInfo.role === ROLE.OFFICER_PROVINCE) {
              dispatch(getDataHome({ page: 1 }))
              dispatch(
                getDataListManagePost({
                  status: STATUS_TYPE.COMPLETE,
                  limit: DEFAULT_PARAMS.LIMIT,
                  page: DEFAULT_PARAMS.PAGE,
                })
              )
              NavigationUtil.navigate(SCREEN_ROUTER_APP.MANAGE_LIST_POST, {
                page: 2,
              })
            } else {
              dispatch(
                getDataListManagePost({
                  status: 2,
                  limit: DEFAULT_PARAMS.LIMIT,
                  page: DEFAULT_PARAMS.PAGE,
                })
              )
              NavigationUtil.goBack()
            }
          } catch (error) {
          } finally {
            hideLoading()
          }
        }
      )
    }
  }

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const onUpdateDataPostToReducer = () => {
    const payload = {
      title: dataPostDetail.title,
      content: dataPostDetail.content,
      name: dataPostDetail.name,
      phone: dataPostDetail.phone,
      gender: dataPostDetail.gender,
      year_of_birth: dataPostDetail.year_of_birth,
      address: dataPostDetail.address,
      lat: dataPostDetail.lat,
      long: dataPostDetail.long,
      group_id: dataPostDetail.group_id,
      new_category: dataPostDetail.DonateCategoryDetails.map(
        (item: DonateCategoryDetails) => ({
          category_id: item.category_id,
          type: item.type,
        })
      ),
      new_media: dataPostDetail.DonateRequestMedia.map(
        (item: DonateRequestMedia) => ({
          media_url: item.media_path,
          type: item.type,
          url: item.media_url,
        })
      ),
      province_id: dataPostDetail.province_id,
      district_id: dataPostDetail.district_id,
      ward_id: dataPostDetail.ward_id,
      province_name: dataPostDetail.DFProvince.name,
      district_name: dataPostDetail.DFDistrict.name,
      ward_name: dataPostDetail.DFWard ? dataPostDetail.DFWard.name : '',
      id: dataPostDetail.id,
    }
    dispatch(updateDataPost(payload))
    NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_POST, {
      typeNavigate: typeNavigate,
    })
  }

  const onSubmit = () => {
    setIsSubmit(true)
    toggleModal()
  }

  const onModalHide = async () => {
    if (isSubmit) {
      showLoading()
      try {
        if (typeOption === 1) {
          await PostDetailApi.requestUpdatePost({
            id,
            reason_request: inputText,
          })
          dispatch(
            getDataListManagePost({
              status: STATUS_TYPE.EDIT,
              limit: DEFAULT_PARAMS.LIMIT,
              page: DEFAULT_PARAMS.PAGE,
            })
          )
          NavigationUtil.navigate(SCREEN_ROUTER_APP.MANAGE_LIST_POST, {
            page: 1,
          })
        } else if (typeOption === 3) {
          await PostDetailApi.approvePost({
            id,
            reason: inputText,
          })
          dispatch(
            getDataListManagePost({
              status: STATUS_TYPE.DENY,
              limit: DEFAULT_PARAMS.LIMIT,
              page: DEFAULT_PARAMS.PAGE,
            })
          )
          NavigationUtil.navigate(SCREEN_ROUTER_APP.MANAGE_LIST_POST, {
            page: 3,
          })
        }
      } catch (error) {
      } finally {
        hideLoading()
      }
    }
  }

  const showDatePicker = () => {
    showConfirm(
      R.strings().notification,
      'Bạn có chắc chắn muốn duyệt tin này',
      async () => {
        setDatePickerVisibility(true)
      }
    )
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
    end_date.current = datePicker
    hideDatePicker()
    showLoading()
    try {
      await PostDetailApi.approvePost({
        id,
        reason: '',
        end_date: end_date.current,
      })
      if (userInfo.role === ROLE.OFFICER_PROVINCE) {
        dispatch(getDataHome({ page: 1 }))
        dispatch(
          getDataListManagePost({
            status: STATUS_TYPE.COMPLETE,
            limit: DEFAULT_PARAMS.LIMIT,
            page: DEFAULT_PARAMS.PAGE,
          })
        )
        NavigationUtil.navigate(SCREEN_ROUTER_APP.MANAGE_LIST_POST, { page: 2 })
      } else {
        dispatch(
          getDataListManagePost({
            status: 2,
            limit: DEFAULT_PARAMS.LIMIT,
            page: DEFAULT_PARAMS.PAGE,
          })
        )
        NavigationUtil.goBack()
      }
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  if (isError) return <Error reload={getDataPostDetail} />

  const renderData = () => {
    let data = [
      { text: 'Chỉnh sửa', id: 0, icon: R.images.ic_edit_support },
      { text: 'Yêu cầu chỉnh sửa', id: 1, icon: R.images.ic_edit_support },
      { text: 'Tài khoản ngân hàng', id: 2, icon: R.images.ic_credit_card },
      { text: 'Từ chối', id: 3, icon: R.images.ic_cancel_support },
    ]
    if (
      userInfo.role === ROLE.OFFICER_PROVINCE &&
      dataPostDetail.is_update === 1
    ) {
      data.splice(0, 2)
    } else if (
      userInfo.role === ROLE.OFFICER_PROVINCE &&
      dataPostDetail.status === 3
    ) {
      data.splice(0, 2)
      data.splice(1, 1)
    } else if (
      userInfo.role === ROLE.OFFICER_PROVINCE &&
      type === STATUS_TYPE.EDIT
    ) {
      data.splice(1, 1)
    }
    return data
  }

  return (
    <>
      <ScrollView style={styles.v_container}>
        <ModalDeny
          typeOption={typeOption}
          textInput={inputText}
          setTextInput={setInputText}
          title={'Ghi chú'}
          isVisible={isVisible}
          onClose={toggleModal}
          onSubmit={onSubmit}
          onModalHide={onModalHide}
        />
        <PostImageArea data={dataPostDetail.DonateRequestMedia} />
        {!(!type && type !== 0) && (
          <ViewStatus
            typeNavigate={typeNavigate}
            id={dataPostDetail.id}
            reason={
              type === 0
                ? dataPostDetail.reason
                : type === 1
                ? dataPostDetail.reason_request
                : ''
            }
            status={status}
            type={type}
            name={
              dataPostDetail?.DonateDequestHistory
                ? dataPostDetail?.DonateDequestHistory[0]?.User?.name
                : ''
            }
          />
        )}
        <Tabs
          initialPage={0}
          tabBarUnderlineStyle={styles.lineTab}
          tabBarActiveTextColor={colors.primary}
          tabBarInactiveTextColor="#595959"
          tabBarTextStyle={styles.txt_tab}
        >
          <Tab
            activeTabStyle={styles.background}
            tabStyle={styles.background}
            heading={'Câu chuyện'}
          >
            <Story data={dataPostDetail} />
          </Tab>
          <Tab
            activeTabStyle={styles.background}
            tabStyle={styles.background}
            heading={'Thông tin ủng hộ'}
          >
            <BankInfo data={dataPostDetail} />
          </Tab>
        </Tabs>
      </ScrollView>
      <ButtonBack />

      {!(typeNavigate === 1 && type !== STATUS_TYPE.EDIT) &&
        !(
          (status === 2 || status === 3) &&
          typeNavigate === 2 &&
          userInfo.role === ROLE.OFFICER_DISTRICT
        ) &&
        typeNavigate !== 3 && (
          <ViewBottom
            is_update={dataPostDetail?.is_update}
            typeNavigate={typeNavigate}
            status={dataPostDetail?.status}
            openOption={() => {
              ref.current?.show()
            }}
            type={type}
            handleApprove={handleApprove}
            id={dataPostDetail?.id}
          />
        )}
      {typeNavigate === 3 &&
        !(
          (userInfo.role === ROLE.CUSTOMER ||
            userInfo.role === ROLE.OFFICER_WARD) &&
          dataPostDetail.is_update === 0
        ) &&
        !(
          userInfo.role === ROLE.OFFICER_DISTRICT &&
          (dataPostDetail.status === 2 || dataPostDetail.status === 3)
        ) && (
          <ViewBottom2
            status={dataPostDetail?.status}
            handleApprove={handleApprove}
            openOption={() => {
              ref.current?.show()
            }}
            is_update={dataPostDetail.is_update}
          />
        )}

      <ActionSheet
        ref={ref}
        onPressOption={async item => {
          if (item.id === 1) {
            setTypeOption(1)
            setTimeout(() => {
              setIsVisible(!isVisible)
            }, 1000)
          } else if (item.id === 3) {
            setTypeOption(3)
            setTimeout(() => {
              setIsVisible(!isVisible)
            }, 1000)
          } else if (item.id === 0) {
            onUpdateDataPostToReducer()
          } else if (item.id === 2) {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.BANK_INFO, {
              data: dataPostDetail,
            })
          }
        }}
        textOptionStyle={styles.textOptionStyle}
        //  / optionStyle={styles.optionStyle}
        option={renderData()}
      />
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

const styles = StyleSheet.create({
  optionStyle: {},
  textOptionStyle: {
    ...fonts.regular16,
    fontWeight: '500',
    color: colors.text,
  },
  v_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS !== 'ios' ? 20 : getBottomSpace(),
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.width - 30,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  v_button2: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  text: {
    ...fonts.semi_bold16,
    color: 'white',
  },
  lineTab: {
    height: 2,
    backgroundColor: 'red',
  },
  txt_tab: {
    ...fonts.semi_bold15,
  },
  background: {
    backgroundColor: 'white',
  },
  v_button3: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS !== 'ios' ? 20 : isIphoneX() ? getBottomSpace() : 20,
    paddingHorizontal: 15,
  },
  img_option: {
    width: 77,
    height: 45,
    marginLeft: 12,
  },
  txt_date_expire: {
    alignSelf: 'center',
    ...fonts.regular16,
    fontWeight: '500',
    marginTop: 20,
  },
})

export default PostDetail
