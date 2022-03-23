import React, { useState } from 'react'
import { ScrollableTab, Tab, Tabs } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { dimensions, fonts } from '@app/theme'

import ListSupportComponent from './component/ListSupportComponent'
import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme/colors'

const headerComponent = [
  {
    id: 1,
    name: 'Chờ phê duyệt',
  },
  {
    id: 2,
    name: 'Đã duyệt',
  },
  {
    id: 3,
    name: 'Từ chối',
  },
]
const ManageListSupportScreen = () => {
  const [page, setPage] = useState<number>(0)
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().support_list}
    >
      <View style={{flex:1}}>
        <Tabs
          page={page}
          tabContainerStyle={styles.tabContainerStyle}
          tabBarUnderlineStyle={{ height: 0 }}
          // onChangeTab={(i: number) => {
          //   setPage(i)
          // }}
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
                <ListSupportComponent />
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
})
