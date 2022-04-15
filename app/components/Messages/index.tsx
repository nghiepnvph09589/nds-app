import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '../FstImage'
import React from 'react'
import { Source } from 'react-native-fast-image'

const Messages = ({
  hide,
  title,
  description,
  bannerNotify,
  onCancel,
  onAccept,
}: {
  hide?: () => void
  title?: string
  description?: string
  bannerNotify?: Source
  onCancel?: () => void
  onAccept?: () => void
}) => {
  return (
    <TouchableWithoutFeedback onPress={hide}>
      <View style={styles.container}>
        <View style={styles.v_detail}>
          {bannerNotify && (
            <FstImage
              resizeMode={'contain'}
              style={styles.img_notify}
              source={bannerNotify}
            />
          )}
          <Text
            style={{ ...fonts.semi_bold18, color: colors.textColor.gray8 }}
            children={title || 'Thông báo'}
          />
          <Text style={styles.content} children={description || 'ok'} />
          <View style={styles.v_btn}>
            {onCancel && (
              <>
                <TouchableOpacity onPress={onCancel} style={styles.btn}>
                  <Text
                    style={{
                      ...fonts.regular16,
                      color: colors.textColor.gray9,
                    }}
                    children={'Hủy'}
                  />
                </TouchableOpacity>
                <View style={styles.line} />
              </>
            )}
            <TouchableOpacity onPress={onAccept} style={styles.btn}>
              <Text
                style={{ ...fonts.regular16, color: colors.textColor.gray9 }}
                children={'Xác nhận'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Messages
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    // marginTop: 5,
  },
  line: {
    height: 20,
    width: 1,
    backgroundColor: colors.border,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
  },
  v_btn: {
    paddingVertical: 10,
    ...styleView.rowItem,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  content: {
    marginVertical: 20,
    marginHorizontal: 25,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    textAlign: 'center',
  },
  v_detail: {
    backgroundColor: colors.white,
    paddingTop: 25,
    borderRadius: 16,
    alignItems: 'center',
  },
  img_notify: {
    width: dimensions.width * 0.18,
    height: dimensions.width * 0.18,
    marginBottom: 25,
  },
})
