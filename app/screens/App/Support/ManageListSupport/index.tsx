import { ScrollableTab, Tab, Tabs } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { dimensions, fonts } from '@app/theme'

import ListSupportComponent from './component/ListSupportComponent'
import R from '@app/assets/R'
import React from 'react'
import { STATUS_SUPPORT } from '@app/constant/Constant'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme/colors'

const headerComponent = [
  {
    id: STATUS_SUPPORT.WAITING,
    name: 'Chưa liên hệ',
  },
  {
    id: STATUS_SUPPORT.APPROVE,
    name: 'Đã lên hệ',
  },
  // {
  //   id: STATUS_SUPPORT.EDIT,
  //   name: 'Yêu cầu chỉnh sửa',
  // },
  {
    id: STATUS_SUPPORT.SUCCESS,
    name: 'Hoàn thành',
  },
  {
    id: STATUS_SUPPORT.CANCEL,
    name: 'Từ chối',
  },
]

interface Props {
  route: {
    params: {
      pageList: number
    }
  }
}
const ManageListSupportScreen = (props: Props) => {
  // const [page, setPage] = useState<number>(0)

  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().support_list}
      borderBottomHeader={colors.border}
    >
      <View style={styles.ctn}>
        <Tabs
          initialPage={props?.route?.params?.pageList}
          page={props?.route?.params?.pageList}
          tabContainerStyle={styles.tabContainerStyle}
          tabBarUnderlineStyle={styles.underline}
          // onChangeTab={(i: any) => {
          //   setPage(i.i)
          // }}
          renderTabBar={renderTabBar}
          locked={true}
        >
          {headerComponent.map(item => {
            return (
              <Tab
                key={item.id}
                heading={item.name}
                activeTabStyle={styles.active_style}
                tabStyle={{ backgroundColor: colors.white }}
                activeTextStyle={{ color: colors.primary }}
                textStyle={[styles.textStyle]}
              >
                <ListSupportComponent status={item?.id} />
              </Tab>
            )
          })}
        </Tabs>
      </View>
    </ScreenWrapper>
  )
}

const renderTabBar = (props: any) => {
  props.tabStyle = Object.create(props.tabStyle)
  return <ScrollableTab style={styles.scrollable_tab} {...props} />
}

export default ManageListSupportScreen

const styles = StyleSheet.create({
  scrollable_tab: {
    height: 44,
    width: dimensions.width,
    backgroundColor: colors.white,
  },
  tabContainerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    shadowColor: 'white',
    marginTop: 1.5,
  },
  textStyle: {
    ...fonts.regular16,
    color: '#868E96',
  },
  active_style: {
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
  ctn: {
    flex: 1,
  },
  underline: {
    height: 0,
  },
})
