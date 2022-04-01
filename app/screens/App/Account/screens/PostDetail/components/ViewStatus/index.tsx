import { StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState } from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import { STATUS_TYPE } from '@app/constant/Constant'

interface ViewStatusProps {
  type: number
  status: number
  reason?: string
}

const ViewStatus = (props: ViewStatusProps) => {
  const [isEnabled, setIsEnabled] = useState(true)
  const [textStatus, setTextStatus] = useState<string>('Đang hoạt động')
  const { type, status, reason } = props

  const toggleSwitch = () =>
    setIsEnabled(previousState => {
      if (previousState) {
        setTextStatus('Ngừng hoạt động')
      } else if (!previousState) {
        setTextStatus('Đạng hoạt động')
      }
      return !previousState
    })
  return (
    <>
      <View style={styles.v_container}>
        <View style={styles.v_row2}>
          <Text style={styles.status}>Trạng thái</Text>
          <Text
            style={[
              styles.status2,
              { color: isEnabled ? colors.primary : colors.text },
            ]}
          >
            {textStatus}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_post} />
          <Text style={styles.text}>
            {type === STATUS_TYPE.WAIT_CONFIRM
              ? 'Chờ phê duyệt'
              : type === STATUS_TYPE.EDIT
              ? 'Yêu cầu chỉnh sửa'
              : type === STATUS_TYPE.COMPLETE
              ? 'Đã phê duyệt'
              : type === STATUS_TYPE.DENY
              ? 'Từ chối'
              : ''}
          </Text>
          {type === STATUS_TYPE.WAIT_CONFIRM && status === 2 && (
            <View style={styles.v_status}>
              <Text style={{ ...fonts.regular14, color: colors.primary }}>
                Huyện đã duyệt
              </Text>
            </View>
          )}
        </View>
        {!!reason && <Text style={styles.txt_reason}>{reason}</Text>}
      </View>
      <View style={styles.v_line} />
    </>
  )
}

export default ViewStatus

const styles = StyleSheet.create({
  v_row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  v_container: {
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    ...fonts.regular16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  v_status: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  v_line: {
    height: 1,
    backgroundColor: colors.backgroundColor,
  },
  txt_reason: {
    marginTop: 12,
    ...fonts.regular15,
    color: colors.text,
  },
  status: {
    ...fonts.regular16,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  status2: {
    ...fonts.regular16,
    fontWeight: '500',
    color: colors.primary,
    marginRight: 16,
  },
})
