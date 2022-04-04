import React, { useState } from 'react'
import { SCREEN_ROUTER_APP, STATUS_SUPPORT } from '@app/constant/Constant'
import { ScrollableTab, Tab, Tabs } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { dimensions, fonts } from '@app/theme'

import ListSupportedComponent from './ListSuppotedComponent'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme/colors'

const headerComponent = [
  {
    id: STATUS_SUPPORT.WAITING,
    name: 'Chờ phê duyệt',
  },
  {
    id: STATUS_SUPPORT.APPROVE,
    name: 'Đã duyệt',
  },
  {
    id: STATUS_SUPPORT.EDIT,
    name: 'Yêu cầu chỉnh sửa',
  },
  {
    id: STATUS_SUPPORT.SUCCESS,
    name: 'Hoàn thành',
  },
  {
    id: STATUS_SUPPORT.CANCEL,
    name: 'Từ chối',
  },
]
const ListSupportScreen = (props: {
  route: { params: { pageProvince: number } }
}) => {
  const [page, setPage] = useState<number>(0)
  return (
    <ScreenWrapper
      back
      scroll={false}
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().supported_list}
      borderBottomHeader={colors.border}
      onPressButtonBack={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.USER)
      }}
    >
      <View style={styles.ctn}>
        <Tabs
          initialPage={props?.route?.params?.pageProvince || 0}
          page={page}
          tabContainerStyle={styles.tabContainerStyle}
          tabBarUnderlineStyle={styles.underline}
          onChangeTab={(i: any) => {
            setPage(i.i)
          }}
          renderTabBar={renderTabBar}
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
                <ListSupportedComponent status={item?.id} />
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
export default ListSupportScreen

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
