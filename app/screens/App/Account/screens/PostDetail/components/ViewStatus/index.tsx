import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import { STATUS_TYPE } from '@app/constant/Constant'

interface ViewStatusProps {
  type: number
  status: number
}

const ViewStatus = (props: ViewStatusProps) => {
  const { type, status } = props
  return (
    <>
      <View style={{ paddingVertical: 16, paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FstImage
            style={{ width: 24, height: 24 }}
            source={R.images.ic_post}
          />
          <Text
            style={{
              ...fonts.semi_bold16,
              color: colors.text,
              marginLeft: 12,
              flex: 1,
            }}
          >
            {type === STATUS_TYPE.WAIT_CONFIRM
              ? 'Chờ phê duyệt'
              : type === STATUS_TYPE.EDIT
              ? 'Yêu cầu chỉnh sửa'
              : type === STATUS_TYPE.COMPLETE
              ? 'Đã phê duyệt'
              : 'Từ chối'}
          </Text>
          {type === STATUS_TYPE.WAIT_CONFIRM && status === 2 && (
            <View
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <Text style={{ ...fonts.regular14, color: colors.primary }}>
                Huyện đã duyệt
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: colors.backgroundColor }} />
    </>
  )
}

export default ViewStatus

const styles = StyleSheet.create({})
