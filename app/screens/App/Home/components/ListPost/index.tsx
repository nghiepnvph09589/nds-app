import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useCallback } from 'react'
import Banner from './components/Banner'
import { DataBanner } from '../../mockup'
import CategoryAndAddress from './components/CategoryAndAddress'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import InfoPost from './components/InfoPost'
import ContentPost from './components/ContentPost'

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
      contentContainerStyle={{ paddingBottom: 20 }}
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
})
