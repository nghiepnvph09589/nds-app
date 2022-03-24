import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { Tab, Tabs } from 'native-base'
import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import PostImageArea from '../../components/PostImageArea'
import ButtonBack from './components/ButtonBack'
import Story from './components/Story'

const PostDetail = () => {
  const { data } = useAppSelector(state => state.homeReducer)
  return (
    <>
      <ScrollView style={styles.v_container}>
        <PostImageArea data={data.listPost[2]?.DonateRequestMedia} />
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
            <Story />
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            heading={'Thông tin ủng hộ'}
          >
            <Text>alo</Text>
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
