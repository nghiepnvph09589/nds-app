import { colors } from '@app/theme'
import React from 'react'
import { View, Text } from 'react-native'
import { DebounceButton } from '../Button/Button'
import { styles } from './RNAlert.style'
import { AlertConfigParams } from './RNAlert.type'

const RNAlertUI = (props: AlertConfigParams) => {
  const {
    title,
    content,
    type,
    onConfirm,
    onCancel,
    confirmTitle,
    cancelTitle,
    renderCustomUI,
  } = props

  return React.isValidElement(renderCustomUI) ? (
    renderCustomUI
  ) : (
    <>
      <View style={styles.contentBlock}>
        <Text style={styles.title} children={title} />
        <Text style={styles.content} children={content} />
      </View>
      <View style={styles.btnBlock}>
        {type === 'standard' && (
          <>
            <DebounceButton
              style={styles.btnView}
              onPress={onCancel!}
              children={<Text style={styles.btnText} children={cancelTitle} />}
            />
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 1, height: 20, backgroundColor: '#868E96' }}
            />
          </>
        )}
        <DebounceButton
          style={styles.btnView}
          onPress={onConfirm!}
          children={
            <Text
              style={[styles.btnText, { color: colors.primary }]}
              children={confirmTitle}
            />
          }
        />
      </View>
    </>
  )
}

export default RNAlertUI
