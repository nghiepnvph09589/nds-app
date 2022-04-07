import R from '@app/assets/R'
import { colors } from '@app/theme'
import React, { Component } from 'react'
import {
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import FstImage from '../FstImage'

interface Props {
  onChangeText: (text: string) => void
  placeholder?: string
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<ViewStyle>
  value?: string
  back?: boolean
  camera?: boolean
  onPressCamera?: () => void
  clear?: () => void
  maxLength?: number
  onFocus?: () => void
  onBlur?: () => void
}

interface State {
  searchBarFocused: boolean
}

export default class Search extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.state = {
      searchBarFocused: false,
    }
  }

  keyboardDidShow = null
  keyboardWillShow = null
  keyboardWillHide = null
  keyboardDidHide = null
  componentDidMount() {
    // this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.onKeyboardDidShow);
    // this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.onKeyboardWillShow);
    // this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.onKeyboardWillHide);
    // this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.onKeyboardDidHide);
  }
  onKeyboardDidHide = () => {
    this.setState({ searchBarFocused: false })
  }

  onKeyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
    // alert("ahihi");
  }
  onKeyboardWillShow = () => {
    this.setState({ searchBarFocused: true })
    // alert("ahihi");
  }
  onKeyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
    // alert("ahihi");
  }

  getStateBarFocused = () => {
    return this.state.searchBarFocused
  }

  onClearText = () => {
    this.refInput.clear()
  }

  refInput = React.createRef()

  render() {
    const {
      onChangeText,
      placeholder,
      style,
      inputStyle,
      value,
      back = true,
      clear,
      maxLength = 50,
      onFocus,
      onBlur,
      ...props
    } = this.props
    const containerStylePlatForm =
      Platform.OS === 'ios'
        ? { paddingVertical: Platform.OS === 'ios' ? 10 : -5 }
        : { height: 42 }
    const image = !back
      ? R.images.ic_search
      : !this.state.searchBarFocused
      ? R.images.ic_search
      : R.images.ic_back

    return (
      <View style={style}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            justifyContent: 'center',
          }}
        >
          <View
            style={[styles.input, containerStylePlatForm, inputStyle]}
            animation="slideInRight"
            duration={400}
          >
            {back ? (
              // <Animatable.View animation={this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'} duration={400}>
              <Image style={styles.icon} source={image} />
            ) : (
              // </Animatable.View>
              <Image style={styles.icon} source={R.images.ic_search} />
            )}
            <TextInput
              ref={e => (this.refInput = e)}
              maxLength={maxLength}
              value={value}
              onFocus={onFocus}
              onBlur={onBlur}
              // editable={false}
              onChangeText={onChangeText}
              placeholder={placeholder || R.strings().enter_content_search}
              style={styles.containerInput}
              {...props}
            />

            {typeof value === 'string' && !!value.length && (
              <TouchableOpacity
                onPress={clear}
                children={
                  <FstImage
                    source={R.images.ic_clear}
                    style={styles.iconCam}
                    tintColor={colors.line}
                  />
                }
              />
            )}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.backgroundColor,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 8,
    tintColor: '#707070',
  },
  iconCam: {
    tintColor: colors.primary,
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 12,
  },
  containerInput: {
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
    fontFamily: R.fonts.san_regular,
    color: '#000',
  },
})
