/* eslint-disable react-hooks/exhaustive-deps */
import R from '@app/assets/R'
import Error from '@app/components/Error/Error'
import FstImage from '@app/components/FstImage'
import { DEFAULT_PARAMS, ROLE, STATUS_TYPE } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { getDataHome } from '@app/screens/App/Home/slice/HomeSlice'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { showConfirm } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { Tab, Tabs } from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useDispatch } from 'react-redux'
import PostImageArea from '../ListPostUser/components/PostImageArea'
import { getDataListManagePost } from '../ManageListPost/slice/ManageListPostSlice'
import PostDetailApi from './api/PostDetailApi'
import BankInfo from './components/BankInfo'
import ButtonBack from './components/ButtonBack'
import Story from './components/Story'
import ViewStatus from './components/ViewStatus'
import { PostDetailData } from './model'

interface PostDetailProps {
  route: { params: { id: number; status: number; type?: number } }
}

const PostDetail = (props: PostDetailProps) => {
  const dispatch = useDispatch()
  const userInfo = useAppSelector(state => state.accountReducer).data
  const { id, status, type } = props.route.params
  const [isError, setIsError] = useState<boolean>(false)
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
  })
  useEffect(() => {
    getDataPostDetail()
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
    showConfirm(
      R.strings().notification,
      'Bạn có chắc chắn muốn duyệt tin này',
      async () => {
        showLoading()
        try {
          await PostDetailApi.approvePost({ id })
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

  if (isError) return <Error reload={getDataPostDetail} />

  return (
    <>
      <ScrollView style={styles.v_container}>
        <PostImageArea data={dataPostDetail.DonateRequestMedia} />
        {type && <ViewStatus status={status} type={type} />}
        <Tabs
          initialPage={0}
          tabBarUnderlineStyle={styles.lineTab}
          tabBarActiveTextColor={colors.primary}
          tabBarInactiveTextColor="#595959"
          tabBarTextStyle={styles.txt_tab}
        >
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            heading={'Câu chuyện'}
          >
            <Story data={dataPostDetail} />
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            heading={'Thông tin ủng hộ'}
          >
            <BankInfo data={dataPostDetail} />
          </Tab>
        </Tabs>
      </ScrollView>
      <ButtonBack />
      {type && type !== STATUS_TYPE.COMPLETE ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: Platform.OS !== 'ios' ? 20 : getBottomSpace(),
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity onPress={handleApprove} style={styles.v_button2}>
            <FstImage style={styles.icon} source={R.images.ic_approve} />
            <Text style={styles.text}>
              {userInfo?.role === ROLE.OFFICER_DISTRICT
                ? ' Yêu cầu phê duyệt'
                : 'Phê duyệt'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FstImage
              style={{ width: 77, height: 45, marginLeft: 12 }}
              source={R.images.ic_option}
            />
          </TouchableOpacity>
          {/* <FstImage style={styles.icon} source={R.images.ic_heart} />
         <Text style={styles.text}>{R.strings().support}</Text> */}
        </View>
      ) : !type ? (
        <TouchableOpacity style={styles.v_button}>
          <FstImage style={styles.icon} source={R.images.ic_heart} />
          <Text style={styles.text}>{R.strings().support}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  )
}

const styles = StyleSheet.create({
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
    // /width: dimensions.width - 30,
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
})

export default PostDetail
