import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { STATUS_TYPE } from '@app/constant/Constant'
import { colors, dimensions, fonts } from '@app/theme'
import { ScrollableTab, Tab, Tabs, View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

import ListPost from './screens/ListPost'

const ListPostUser = () => {
  const [page, setPage] = useState<number>(0)

  const onChangeTab = (changeTabProps: { i: number }) => {
    const newTabIndex = changeTabProps.i
    setPage(newTabIndex)
  }

  const listStatus = [
    {
      id: 1,
      status: STATUS_TYPE.WAIT_CONFIRM,
      name: 'Chờ phê duyệt',
    },
    {
      id: 2,
      status: STATUS_TYPE.EDIT,
      name: 'Chỉnh sửa',
    },
    {
      id: 3,
      status: STATUS_TYPE.COMPLETE,
      name: 'Đã phê duyệt',
    },
    {
      id: 4,
      status: STATUS_TYPE.DENY,
      name: 'Từ chối',
    },
  ]
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Tin đăng của tôi'}
      children={
        <View style={styles.v_container}>
          <Tabs
            tabContainerStyle={styles.tabContainerStyle}
            tabBarUnderlineStyle={styles.underlineStyle}
            onChangeTab={onChangeTab}
            page={page}
            initialPage={0}
            renderTabBar={() => <ScrollableTab style={styles.scroll_tab} />}
          >
            {listStatus.map(item => {
              return (
                <Tab
                  key={item.id}
                  heading={item.name}
                  activeTabStyle={styles.active_tab}
                  activeTextStyle={{ color: colors.primary }}
                  tabStyle={styles.active_tab}
                  textStyle={styles.text_style}
                >
                  <ListPost status={item?.status} page={page} />
                </Tab>
              )
            })}
          </Tabs>
        </View>
      }
    />
  )
}

export default ListPostUser

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  scroll_tab: {
    height: isIphoneX() ? 44 : 55,
    width: dimensions.width,
    backgroundColor: colors.white,
  },
  underlineStyle: {
    height: 1.5,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  tabContainerStyle: {
    backgroundColor: colors.backgroundColor,
    borderBottomWidth: 0,
    shadowColor: 'white',
    borderBottomColor: 'white',
  },
  text_style: {
    ...fonts.regular16,
    color: '#595959',
  },

  tab_style: {
    backgroundColor: colors.white,
    borderRightWidth: 1,
    marginVertical: 13,
    borderColor: '#CED4DA',
  },
  active_tab: {
    backgroundColor: 'white',
  },
})
