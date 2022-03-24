import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { colors, dimensions, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { Tab, Tabs } from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import PostImageArea from '../ListPost/components/PostImageArea'
import PostDetailApi from './api/PostDetailApi'
import BankInfo from './components/BankInfo'
import ButtonBack from './components/ButtonBack'
import Story from './components/Story'
import { PostDetailData } from './model'

interface PostDetailProps {
  route: { params: { id: number } }
}

const PostDetail = (props: PostDetailProps) => {
  const id = props.route.params.id
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
      setDataPostDetail(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <ScrollView style={styles.v_container}>
        <PostImageArea data={dataPostDetail.DonateRequestMedia} />
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
      <TouchableOpacity style={styles.v_button}>
        <FstImage style={styles.icon} source={R.images.ic_heart} />
        <Text style={styles.text}>{R.strings().support}</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_button: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS !== 'ios' ? 20 : getBottomSpace(),
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.width - 30,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
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
