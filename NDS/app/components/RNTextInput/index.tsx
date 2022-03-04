import { Input, Text } from 'react-native-elements'
import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import { RNInputProps } from './RNInput.props'
import { isEqual } from 'lodash'

import FstImage from '../FstImage'
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield'
import R from '@app/assets/R'

const InputComponent = (props: RNInputProps) => {
  const {
    placeholder,
    leftIcon,
    rightIcon,
    label,
    secureTextEntry,
    errorMeg,
    onChangeText,
    onFocus,
    keyboardType,
    onRight,
    disabled,
    onBlur,
    autoFocus,
    value,
    isRequite,
    inputStyle,
    rightText,
    returnKeyType,
    onSubmitEditing,
    maxLength,
    ref,
    inputContainerStyle,
    placeholderColor,
    style,
    errorStyle,
    tinColorLeftIcon,
    tinColorRightIcon,
    isPlaceholderRequire,
    isFocused,
  } = props

  return (
    <TextField
      onSubmitEditing
      //label="Phone number"
      keyboardType="phone-pad"
      containerStyle={{ backgroundColor: 'white' }}
      inputContainerStyle={{
        backgroundColor: 'red',
      }}
      lineType="none"
      prefix={'alo'}
      suffix={'alo'}
      renderLeftAccessory={() => (
        <FstImage
          style={{ width: 24, height: 24 }}
          source={R.images.ic_arrow_down}
        />
      )}

      // formatText={this.formatText}
      // onSubmitEditing={this.onSubmit}
      // ref={this.fieldRef}
    />
    // <View style={inputStyle}>
    //   <Input
    //     label={() => (
    //       <Text style={styles.labelStyle}>
    //         {label}
    //         {!!isRequite && <Text style={styles.isRequite} children={' *'} />}
    //       </Text>
    //     )}
    //     ref={ref}
    //     autoFocus={autoFocus || false}
    //     onFocus={onFocus}
    //     maxLength={maxLength}
    //     placeholder={isPlaceholderRequire ? '' : placeholder}
    //     disabled={disabled}
    //     placeholderTextColor={placeholderColor}
    //     secureTextEntry={
    //       isPlaceholderRequire && !isFocused && !value
    //         ? false
    //         : secureTextEntry
    //         ? true
    //         : false
    //     }
    //     onChangeText={onChangeText}
    //     onBlur={onBlur}
    //     returnKeyType={returnKeyType}
    //     keyboardType={keyboardType}
    //     onSubmitEditing={onSubmitEditing}
    //     autoCapitalize={'none'}
    //     errorMessage={errorMeg}
    //     errorStyle={[styles.errorStyle, errorStyle]}
    //     inputContainerStyle={[
    //       // eslint-disable-next-line react-native/no-inline-styles
    //       { paddingLeft: leftIcon ? 0 : 10 },
    //       inputContainerStyle,
    //     ]}
    //     style={style}
    //     leftIcon={
    //       !!leftIcon && (
    //         <FstImage
    //           source={leftIcon}
    //           style={styles.iconLeft}
    //           resizeMode={'contain'}
    //           tintColor={tinColorLeftIcon}
    //         />
    //       )
    //     }
    //     rightIcon={
    //       rightIcon ? (
    //         <TouchableOpacity onPress={onRight}>
    //           <FstImage
    //             source={rightIcon}
    //             style={styles.iconRight}
    //             resizeMode={'contain'}
    //             tintColor={tinColorRightIcon}
    //           />
    //         </TouchableOpacity>
    //       ) : (
    //         !!rightText && (
    //           <Text style={styles.rightText} children={rightText} />
    //         )
    //       )
    //     }
    //   >
    //     {isPlaceholderRequire &&
    //     isPlaceholderRequire === true &&
    //     !isFocused &&
    //     !value ? (
    //       <Text style={styles.textPlaceholder}>
    //         {placeholder}
    //         <Text children={' *'} style={styles.isRequite} />
    //       </Text>
    //     ) : (
    //       <Text children={value} style={style} />
    //     )}
    //   </Input>
    // </View>
  )
}

const styles = StyleSheet.create({
  labelStyle: {
    ...fonts.regular14,
    marginBottom: 10,
  },
  errorStyle: {
    fontSize: 15,
  },
  isRequite: {
    color: 'red',
  },
  rightText: {
    color: colors.black,
  },
  iconRight: {
    width: 20,
    height: 20,
  },
  iconLeft: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  textPlaceholder: {
    color: '#8C8C8C',
    fontSize: 16,
  },
})

const RNTextInput = memo(InputComponent, isEqual)

export default RNTextInput
