import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import { isEqual } from 'lodash'
import React, { memo, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import FstImage from '../FstImage'
import { RNInputProps } from './RNInput.props'

const InputComponent = (props: RNInputProps<any>) => {
  const {
    containerStyle,
    placeholder,
    leftIcon,
    secureTextEntry,
    errorMessage,
    onChangeText,
    onFocus,
    keyboardType,
    editable,
    onBlur,
    autoFocus,
    value,
    touched,
    isRequire,
    inputStyle,
    returnKeyType,
    onSubmitEditing,
    maxLength,
    ref,
    inputContainerStyle,
    errorStyle,
    isPlaceholderRequire,
    isFocused,
  } = props

  const [isSecureText, setIsSecureText] =
    useState<boolean | undefined>(secureTextEntry)

  return (
    <View style={[containerStyle]}>
      <View style={[styles.v_container, inputContainerStyle]}>
        {!!leftIcon && (
          <FstImage
            source={leftIcon}
            style={styles.iconLeft}
            resizeMode="contain"
          />
        )}
        <TextInput
          autoFocus={autoFocus || false}
          ref={ref}
          onFocus={onFocus}
          editable={editable}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
          placeholderTextColor={colors.placeHolder}
          style={[styles.textInput, inputStyle]}
          placeholder={placeholder}
          onBlur={onBlur}
          keyboardType={keyboardType}
          autoCapitalize={'none'}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={isSecureText}
          returnKeyType={returnKeyType}
        />
        {/* {' '}
          {placeholder && <Text>{placeholder}</Text>}
        </TextInput> */}
        {!!secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
            <FstImage
              source={isSecureText ? R.images.ic_eye : R.images.ic_eye_hide}
              style={styles.iconRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {!!errorMessage && touched && (
        <Text
          style={[styles.error_message, errorStyle]}
          children={errorMessage}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  v_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 11.5,
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconRight: {
    width: 24,
    aspectRatio: 1,
    marginLeft: 10,
  },
  iconLeft: {
    width: 24,
    aspectRatio: 1,
    marginRight: 10,
  },
  textPlaceholder: {
    color: '#8C8C8C',
    fontSize: 16,
  },
  textInput: {
    ...fonts.regular16,
    flex: 1,
    paddingVertical: 0,
    color: colors.text,
  },
  error_message: {
    ...fonts.italic12,
    textAlign: 'right',
    color: '#FFB7B7',
    marginTop: '2%',
  },
})

const RNTextInput = memo(InputComponent, isEqual)

export default RNTextInput
