import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Banner from './components/Banner'
import { DataBanner } from '../../mockup'
import CategoryAndAddress from './components/CategoryAndAddress'

const ListPost = () => {
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 8,
          paddingTop: 18,
          paddingBottom: 12,
          paddingHorizontal: 15,
        }}
      >
        <Text>alo</Text>
      </View>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Banner dataBanner={DataBanner} />
          <CategoryAndAddress />
        </>
      }
      onRefresh={() => {}}
      refreshing={false}
      data={['alo']}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      // ListEmptyComponent={<Empty description={R.strings().list_order_empty} />}
    />
  )
}

export default ListPost

const styles = StyleSheet.create({})
