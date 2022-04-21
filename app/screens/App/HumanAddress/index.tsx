/* eslint-disable react-hooks/rules-of-hooks */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors, fonts } from '@app/theme'
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import Empty from '@app/components/Empty/Empty'
import { useDispatch } from 'react-redux'
import { getListAddress } from './slice/HumanAddressSlice'
import { HumanAddressType } from './model'
import { useAppSelector } from '@app/store'

import { DEFAULT_PARAMS } from '@app/constant/Constant'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import Error from '@app/components/Error/Error'

const dataFilter = [
  { title: 'Khu vực' },
  { title: 'Phân nhóm' },
  { title: 'Đối tượng' },
  { title: 'Nhu cầu' },
]
const HumanAddress = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, data, isLastPage, isLoadMore } = useAppSelector(
    state => state.humanAddressReducer
  )
  const [body, setBody] = useState({
    page: DEFAULT_PARAMS.PAGE,
    limit: DEFAULT_PARAMS.LIMIT,
  })

  useEffect(() => {
    getDataListAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])

  const getDataListAddress = () => {
    dispatch(getListAddress(body))
  }

  var onEndReachedCalledDuringMomentum = true

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !isLastPage && !isLoadMore) {
      setBody({
        ...body,
        page: body.page + 1,
      })
    }
  }

  const onRefreshData = () => {
    setBody({
      ...body,
      page: DEFAULT_PARAMS.PAGE,
    })
  }

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  if (isError) return <Error reload={() => {}} />

  const renderItem = useCallback(({ item }: { item: HumanAddressType }) => {
    return (
      <View style={styles.v_item}>
        <FstImage
          resizeMode="cover"
          style={styles.img_post}
          source={{ uri: item?.DonateRequestMedia[0]?.media_url }}
        />
        <View
          style={{ flex: 1, marginLeft: 16, justifyContent: 'space-between' }}
        >
          <Text
            numberOfLines={2}
            style={{
              ...fonts.regular16,
              color: colors.text,
              fontWeight: '500',
              marginTop: 3,
            }}
          >
            {item?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...fonts.regular16,
              color: '#595959',
            }}
          >
            {item?.content}
          </Text>
        </View>
      </View>
    )
  }, [])
  const keyExtractor = useCallback((item: HumanAddressType) => `${item.id}`, [])
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().human_address}
      children={
        <>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.v_scroll}
          >
            {dataFilter?.map((item: { title: string }, i: number) => (
              <TouchableOpacity key={i} style={styles.v_item_scroll}>
                <Text style={styles.txt_filter}>{item.title}</Text>
                <FstImage
                  resizeMode="contain"
                  style={styles.ic_arrow}
                  source={R.images.ic_arrow_down}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.v_line} />
          <View style={{ flex: 1 }}>
            <View style={styles.v_row}>
              <FstImage style={styles.image} source={R.images.ic_annotation} />
              <Text style={styles.txt_count_address}>11 địa điểm nhân đạo</Text>
            </View>
            <FlatList
              onRefresh={onRefreshData}
              refreshing={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={onMomentumScrollBegin}
              onEndReached={handleLoadMore}
              ListFooterComponent={
                isLoadMore ? (
                  <ActivityIndicator
                    color={colors.colorDefault.placeHolder}
                    style={styles.v_load_more}
                  />
                ) : null
              }
              ListEmptyComponent={<Empty description={'Danh sách rỗng'} />}
            />
          </View>
        </>
      }
    />
  )
}

export default HumanAddress

const styles = StyleSheet.create({
  v_content: { flex: 1, marginLeft: 16, justifyContent: 'space-between' },
  img_post: { width: 80, height: 80, borderRadius: 8 },
  v_item: {
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
  },
  txt_count_address: {
    ...fonts.regular15,
    color: colors.text,
    marginLeft: 8,
  },
  image: {
    width: 24,
    height: 24,
  },
  v_scroll: {
    maxHeight: 35,
    paddingHorizontal: 5,
  },
  v_item_scroll: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  txt_filter: {
    ...fonts.regular15,
    color: '#595959',
    marginRight: 5,
  },
  ic_arrow: {
    width: 20,
    height: 20,
  },
  v_line: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: 5,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingLeft: 15,
  },
  v_load_more: {
    marginVertical: 15,
  },
})
