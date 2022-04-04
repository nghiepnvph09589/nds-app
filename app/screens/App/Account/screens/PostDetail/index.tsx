import { ActionSheet, ActionSheetRef } from '@app/components/ActionSheet'
import {
  DEFAULT_PARAMS,
  ROLE,
  SCREEN_ROUTER_APP,
  STATUS_TYPE,
} from '@app/constant/Constant'
import {
  DonateCategoryDetails,
  DonateRequestMedia,
  PostDetailData,
} from './model'
import { Platform, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'native-base'
import { colors, dimensions, fonts } from '@app/theme'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { showConfirm, showMessages } from '@app/utils/AlertHelper'

import BankInfo from './components/BankInfo'
import ButtonBack from './components/ButtonBack'
import Error from '@app/components/Error/Error'
import ModalDeny from './components/ModalDeny'
import NavigationUtil from '@app/navigation/NavigationUtil'
import PostDetailApi from './api/PostDetailApi'
import PostImageArea from '@app/screens/App/Home/components/ListPost/components/PostImageArea'
import R from '@app/assets/R'
import Story from './components/Story'
import ViewBottom from './components/ViewBottom'
import ViewStatus from './components/ViewStatus'
import { getDataHome } from '@app/screens/App/Home/slice/HomeSlice'
import { getDataListManagePost } from '../ManageListPost/slice/ManageListPostSlice'
import { updateDataPost } from '@app/screens/App/UpdatePost/slice/UpdatePostSlice'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

interface PostDetailProps {
  route: { params: { id: number; status: number; type?: number } }
}

const PostDetail = (props: PostDetailProps) => {
  const dispatch = useDispatch()
  const userInfo = useAppSelector(state => state.accountReducer).data
  const { id, status, type } = props.route.params
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
    } catch (error) {
      setIsError(true)
    } finally {
      hideLoading()
    }
  }

  const handleApprove = async () => {
    if (type === STATUS_TYPE.COMPLETE) {
      NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_POST)
    } else {
      showConfirm(
        R.strings().notification,
        'Bạn có chắc chắn muốn duyệt tin này',
        async () => {
          showLoading()
          try {
            await PostDetailApi.approvePost({ id, reason: '' })
            if (userInfo.role === ROLE.OFFICER_PROVINCE) {
              dispatch(getDataHome({ page: 1 }))
            }
            dispatch(
              getDataListManagePost({
                status: 2,
                limit: DEFAULT_PARAMS.LIMIT,
                page: DEFAULT_PARAMS.PAGE,
              })
            )
            NavigationUtil.goBack()
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
    NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_POST)
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
        } else if (typeOption === 3) {
          await PostDetailApi.approvePost({
            id,
            reason: inputText,
          })
        }
        dispatch(
          getDataListManagePost({
            status: 2,
            limit: DEFAULT_PARAMS.LIMIT,
            page: DEFAULT_PARAMS.PAGE,
          })
        )
        NavigationUtil.goBack()
      } catch (error) {
      } finally {
        hideLoading()
      }
    }
  }

  if (isError) return <Error reload={getDataPostDetail} />

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
      <ViewBottom
        openOption={() => {
          ref.current?.show()
        }}
        type={type}
        handleApprove={handleApprove}
        id={dataPostDetail?.id}
      />
      <ActionSheet
        ref={ref}
        onPressOption={async item => {
          if (item.id === 1) {
            setTypeOption(1)
            setTimeout(() => {
              setIsVisible(!isVisible)
            }, 1000)
          } else if (item.id === 3) {
            if (userInfo.role === ROLE.OFFICER_DISTRICT) {
              showMessages(
                R.strings().notification,
                'Bạn không đủ quyền để thực hiện chức năng này'
              )
              return
            }
            setTypeOption(3)
            setTimeout(() => {
              setIsVisible(!isVisible)
            }, 1000)
          } else if (item.id === 0) {
            onUpdateDataPostToReducer()
            //NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_POST)
          } else if (item.id === 2) {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.BANK_INFO, {
              data: dataPostDetail,
            })
          }
        }}
        textOptionStyle={styles.textOptionStyle}
        //  / optionStyle={styles.optionStyle}
        option={[
          { text: 'Chỉnh sửa', id: 0, icon: R.images.ic_edit_support },
          { text: 'Yêu cầu chỉnh sửa', id: 1, icon: R.images.ic_edit_support },
          { text: 'Tài khoản ngân hàng', id: 2, icon: R.images.ic_credit_card },
          { text: 'Từ chối', id: 3, icon: R.images.ic_cancel_support },
        ]}
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
})

export default PostDetail
