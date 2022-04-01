import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import RNButton from '@app/components/RNButton/RNButton'
import { colors, dimensions, fonts } from '@app/theme'
import React, { Component } from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'

const { width } = Dimensions.get('window')

interface Props {
  textInput: string
  setTextInput: React.Dispatch<React.SetStateAction<string>>
  isVisible?: boolean
  backdrop?: boolean
  onSubmit: () => void
  onClose?: () => void
  onModalHide?: () => void
  contentView?: React.ReactNode
  title?: string
  textCancel?: string
  textSubmit?: string
  validSubmit?: boolean
  typeOption: number
}

const widthModal = width * 0.87

export default class ModalDeny extends Component<Props> {
  constructor(props: Props | Readonly<Props>) {
    super(props)
  }

  render() {
    const {
      textInput,
      isVisible,
      setTextInput,
      onClose,
      onModalHide,
      onSubmit,
      typeOption,
    } = this.props
    return (
      <Modal
        onModalHide={() => {
          if (onModalHide) onModalHide()
        }}
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={100}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={100}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={150}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          children={
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              children={
                <View style={styles.contentStyle}>
                  <Text style={styles.textTitle}>
                    {typeOption === 1 ? 'Yêu cầu chỉnh sửa' : 'Từ chối'}
                  </Text>
                  <TextInput
                    value={textInput}
                    multiline
                    onChangeText={setTextInput}
                    style={styles.txtInput}
                    placeholder={
                      typeOption === 1
                        ? 'Nhập nội dung yêu cầu chỉnh sửa'
                        : 'Nhập lý do từ chối'
                    }
                    textAlignVertical="top"
                  />
                  <RNButton onPress={onSubmit} title={R.strings().send} />
                  <TouchableOpacity style={styles.v_x} onPress={onClose}>
                    <FstImage
                      resizeMode="contain"
                      style={styles.image}
                      source={R.images.ic_x}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          }
        />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  image: { width: 24, height: 24 },
  contentStyle: {
    width: dimensions.width - 30,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E384D',
    alignSelf: 'center',
    paddingTop: 24,
    paddingHorizontal: 15,
    paddingBottom: 20,

    //  alignItems: 'center'
  },
  line: {
    width: widthModal,
    height: 1,
    backgroundColor: colors.border,
    marginTop: 8,
  },
  icClose: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: 12,
  },

  button: {
    flex: 1,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: colors.line,
  },
  textCancel: {
    // fontFamily: R.fonts.medium,
    fontSize: 16,
    textAlign: 'center',
    color: '#919191',
  },
  textSubmit: {
    //fontFamily: R.fonts.san_semi_bold,
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  textTitle: {
    ...fonts.regular18,
    fontWeight: '500',
    alignSelf: 'center',
    color: colors.text,
  },
  txtInput: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
    height: 150,
    ...fonts.regular16,
    marginBottom: 24,
  },
  v_x: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
})
