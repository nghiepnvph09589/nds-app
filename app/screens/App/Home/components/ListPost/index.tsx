import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { DataBanner } from '../../mockup'
import Banner from './components/Banner'
import CategoryAndAddress from './components/CategoryAndAddress'
import ContentPost from './components/ContentPost'
import InfoPost from './components/InfoPost'

interface ListPost {
  data: any
}

const ListPost = (props: ListPost) => {
  const { data } = props
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View style={styles.v_item}>
        <InfoPost name={item.name} address={item.address} />
        <ContentPost content={item.content_post} />
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
      contentContainerStyle={styles.v_list}
      onRefresh={() => {}}
      refreshing={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      // ListEmptyComponent={<Empty description={R.strings().list_order_empty} />}
    />
  )
}

export default ListPost

const styles = StyleSheet.create({
  v_item: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  v_list: {
    paddingBottom: 20,
  },
})
