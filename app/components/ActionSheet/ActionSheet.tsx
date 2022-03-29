import { ActionSheetProps, OptionData } from './ActionSheet.props'
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'

import { Block } from '../Block/Block'
import Modal from 'react-native-modal'
import R from '@app/assets/R'
import { Text } from 'react-native'
import { colors } from '@app/theme'
import { enhance } from '@app/common/handle'
import equals from 'react-fast-compare'
import { styles } from './ActionSheet.presets'
import { Button } from '../Button/Button'

const ActionSheetComponent = forwardRef((props: ActionSheetProps, ref) => {
  const {
    onPressCancel,
    textCancelStyle,
    rootStyle,
    wrapCancelStyle,
    textOptionStyle,
    wrapOptionStyle,
    title,
    onPressOption,
    onBackDropPress,
    optionStyle,
    isChecked,
    textCancel = R.strings().cancel,
    backDropColor = 'rgba(0,0,0,.5)',
    closeOnBackDrop = true,
    option = [],
  } = props
  const [actionVisible, setActionVisible] = useState(false)
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setActionVisible(true)
      },
      hide: () => {
        setActionVisible(false)
      },
    }),
    []
  )
  const _onPress = useCallback(
    (item: OptionData, index: number) => {
      return () => {
        setActionVisible(false)
        onPressOption && onPressOption(item, index)
      }
    },
    [onPressOption]
  )
  const _onCancel = useCallback(() => {
    onPressCancel && onPressCancel()
    setActionVisible(false)
  }, [onPressCancel])

  const _onBackDropPress = useCallback(() => {
    typeof onBackDropPress === 'function' && onBackDropPress()
    closeOnBackDrop === true && setActionVisible(false)
  }, [closeOnBackDrop, onBackDropPress])

  const textOption = useMemo(
    () => enhance([textOptionStyle]),
    [textOptionStyle]
  )
  const textCancelS = useMemo(
    () => enhance([styles.textCancel, textCancelStyle]),
    [textCancelStyle]
  )
  const wrapOption = useMemo(
    () => enhance([styles.wrapOption, wrapOptionStyle]),
    [wrapOptionStyle]
  )
  const wrapCancel = useMemo(
    () => enhance([styles.wrapCancel, wrapCancelStyle]),
    [wrapCancelStyle]
  )
  const root = useMemo(() => enhance([styles.wrap, rootStyle]), [rootStyle])
  return (
    <Modal
      style={[styles.modal]}
      useNativeDriver={true}
      backdropOpacity={1}
      onBackdropPress={_onBackDropPress}
      onBackButtonPress={_onCancel}
      isVisible={actionVisible}
      // isChecked={isChecked}
      backdropColor={backDropColor}
    >
      <Block style={[root]}>
        <Block style={wrapOption}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <Block style={[styles.wrapTitle]}>
                  <Text style={[styles.title]} children={title + ''} />
                </Block>
              </>
            ))}
          {option?.map((item: OptionData, index: number) => {
            return (
              <Button
                style={[
                  styles.option,
                  optionStyle,
                  {
                    backgroundColor:
                      item?.id === isChecked ? colors.line : colors.white,
                  },
                ]}
                onPress={_onPress(item, index)}
                key={item.text}
              >
                <Text style={textOption} children={item?.text} />
              </Button>
            )
          })}
        </Block>
        <Block style={wrapCancel}>
          <Button onPress={_onCancel} style={[styles.buttonCancel]}>
            <Text style={textCancelS} children={textCancel} />
          </Button>
        </Block>
      </Block>
    </Modal>
  )
})
export const ActionSheet = memo(ActionSheetComponent, equals)
export interface ActionSheetRef {
  show(): void
  hide(): void
}
