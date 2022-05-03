/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import {
  Dimensions,
  FlatList,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React, { Component, LegacyRef } from 'react'
import { colors, dimensions, fonts } from '@app/theme'

import Modal from 'react-native-modal'
import R from '@app/assets/R'
import Search from './Search'
import FstImage from '../FstImage'

const { width, height } = Dimensions.get('screen')

const replaceSpecialCharacter = (inputString: { toString: () => string }) => {
  var result = inputString
    .toString()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    .replace(/Đ/g, 'D')
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
    .replace(/\u02C6|\u0306|\u031B/g, '')
    .replace(/\u02C6|\u0306|\u031B/g, '')
    .replace(
      // eslint-disable-next-line no-useless-escape
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    )
    .trim()
  return result || inputString
}

interface Props<T> {
  /**
   * Hàm được gọi khi click item trong Dropdown
   */
  onSelect?: (index: number, item: any) => void

  onMultiSelect?: (data: any) => void
  /**
   * Hiển thị View chứa item trong Dropdown
   */
  renderRow: (item: any, index: number, isSelected: boolean) => void
  /**
   * Xuất hiện khi click item trong dropdown
   */
  renderButtonText?: (text: any) => void
  data: any[]
  /**
   * Style của Dropdown
   */
  styleContainerDropdown?: StyleProp<ViewStyle>
  defaultValue?: string
  dropDownStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  buttonTextStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  textStyle?: StyleProp<TextStyle>
  isShowIconArrow?: boolean
  showLine?: boolean
  label?: string
  modalRef?: LegacyRef<T>
  renderItem?: (item: any, index: number, isSelected: boolean) => void
  nameAtr: string
  keyExtractor?: string
  require?: boolean
  multipleSelect?: boolean
  hideLabel?: boolean
  arrowStyle?: StyleProp<ImageStyle>
  handleLoadMore?: () => void
  lineStyle?: StyleProp<ViewStyle>
  isRequire?: boolean
  isTextInput?: boolean
}

interface DropdownBottomProps {
  data: Array<any>
  renderItem: (item: any, index: number, isSelected: boolean) => void
  isVisible: boolean
  toggleModal?: () => void
  itemSelected: number
  onSelect: (item: any, index: number) => void
  styleContainerDropdown?: StyleProp<ViewStyle>
  nameAtr?: string
  keyExtractor: any
  hideSearch?: boolean
  handleLoadMore?: () => void
  isTextInput?: boolean
}

export function renderRow(text: any, index: number, isSelected: boolean) {
  return (
    <>
      <View
        style={[
          styles.v_item,
          isSelected && { backgroundColor: colors.primary },
        ]}
      >
        <Text
          style={[
            styles.textDropdown,
            { color: isSelected ? 'white' : 'black' },
          ]}
          children={text}
        />
      </View>
    </>
  )
}

export function renderButtonText(text: any) {
  return <Text style={styles.textDropdown}>{text}</Text>
}

export default class DropdownBottomSheet extends Component<Props<any>> {
  state = {
    isVisible: false,
    name: '',
    itemSelected: null,
    data:
      this.props.data &&
      this.props.data.map(value => {
        if (!value.isChecked) value.isChecked = false
        return value
      }),
  }
  toggleModal = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  onSelect = (indexSelected: number, itemSelected: { [x: string]: any }) => {
    const { nameAtr, onSelect } = this.props
    this.setState({
      name: itemSelected[nameAtr],
      itemSelected: itemSelected,
    })
    onSelect(indexSelected, itemSelected)
  }

  select = (index: number) => {
    if (index === -1) {
      this.setState({
        ...this.state,
        name: '',
      })
    }
  }

  onGoBackMultiSelect = (data: any) => {
    this.setState({
      data,
    })
    this.props.onMultiSelect(data)
  }

  UNSAFE_componentWillReceiveProps(newProps: { data: any }) {
    this.setState({ data: newProps.data })
  }

  shouldComponentUpdate(
    nextProps: any,
    nextState: { isVisible: boolean; name: string }
  ) {
    if (this.state.isVisible !== nextState.isVisible || nextState.name === '')
      return true
    else return false
  }

  render() {
    const {
      renderRow,
      styleContainerDropdown,
      dropDownStyle,
      defaultValue,
      textStyle,
      showLine = true,
      label,
      labelStyle,
      containerStyle,
      multipleSelect = false,
      keyExtractor,
      nameAtr,
      hideLabel = false,
      handleLoadMore,
      isRequire = true,
      isTextInput,
    } = this.props
    const { name } = this.state
    return (
      <View style={[containerStyle]}>
        {!hideLabel && label && (
          <Text
            style={[styles.label, labelStyle]}
            children={
              <>
                {label}
                {isRequire && (
                  <Text
                    style={{ ...fonts.regular16, color: colors.primary }}
                    children=" *"
                  />
                )}
              </>
            }
          />
        )}
        <TouchableOpacity
          onPress={() => {
            if (!multipleSelect) this.toggleModal()
          }}
          style={[styles.dropDownStyleHalfWidth, dropDownStyle]}
          children={
            <>
              <Text
                style={[
                  styles.defaultValue,
                  textStyle,
                  !!name && { color: 'black' },
                ]}
                children={<>{name || defaultValue}</>}
              />
              {!isTextInput && (
                <Text
                  style={{ fontFamily: R.fonts.san_regular, fontSize: 16 }}
                  children={R.strings().choose}
                />
              )}

              <FstImage
                style={styles.icArrow}
                source={R.images.ic_arrow_down}
              />
            </>
          }
        />

        <DropdownBottom
          styleContainerDropdown={styleContainerDropdown}
          data={this.state.data}
          renderItem={renderRow}
          isVisible={this.state.isVisible}
          toggleModal={this.toggleModal}
          itemSelected={this.state.itemSelected}
          onSelect={this.onSelect}
          nameAtr={nameAtr}
          keyExtractor={keyExtractor}
          handleLoadMore={handleLoadMore}
        />
        {/* {showLine && <View style={[styles.line, lineStyle]} />} */}
      </View>
    )
  }
}

interface State {
  itemSelected: any
  isSearchFocus: boolean
  search: string
  timeout: number
  dataSearch: Array<any>
  currentHeight: number
}

class DropdownBottom extends Component<DropdownBottomProps, State> {
  constructor(props: DropdownBottomProps | Readonly<DropdownBottomProps>) {
    super(props)
    this.state = {
      itemSelected: props.itemSelected,
      isSearchFocus: false,
      search: '',
      timeout: 0,
      dataSearch: [],
      currentHeight: 0,
    }
  }
  onEndReachedCalledDuringMomentum = true
  renderItemDropdown = ({ item, index }: any) => {
    const { renderItem, keyExtractor } = this.props
    const { itemSelected } = this.state
    const isSelected =
      itemSelected && itemSelected[keyExtractor] === item[keyExtractor]
    return (
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => {
          this.setState({ itemSelected: item })
        }}
        children={
          <>
            {renderItem(item, index, isSelected)}
            <View style={[styles.line]} />
          </>
        }
      />
    )
  }

  handleSearch = (text: string) => {
    const { timeout } = this.state
    if (timeout) clearTimeout(timeout)

    this.setState({
      search: text,
      timeout: setTimeout(() => {
        var txtSearch = replaceSpecialCharacter(text).toUpperCase()
        var listKey = txtSearch.split(' ')
        var newData: any[] = []
        listKey.forEach((key: string) => {
          newData = this.props.data.filter(item => {
            const itemData = `${replaceSpecialCharacter(
              item[this.props.nameAtr]
            ).toUpperCase()}`
            return itemData.indexOf(key) > -1
          })
        })
        this.setState({ dataSearch: newData })
      }),
    })
  }

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false
  }

  render() {
    const {
      data,
      isVisible,
      toggleModal,
      onSelect,
      keyExtractor,
      hideSearch = false,
      handleLoadMore,
    } = this.props
    return (
      <Modal
        onModalHide={() => {}}
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        style={styles.containerModal}
        hideModalContentWhileAnimating={true}
      >
        {Platform.OS === 'android' && <View style={styles.fix} />}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled={true}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
          style={{
            marginHorizontal: 10,
          }}
          children={
            <>
              <View style={styles.ctn}>
                {data && !hideSearch && !!data.length && (
                  <Search
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 5,
                      marginBottom: 15,
                    }}
                    placeholder={R.strings().enter_search_text}
                    value={this.state.search}
                    clear={() => {
                      this.handleSearch('')
                    }}
                    onChangeText={this.handleSearch}
                  />
                )}
                <FlatList
                  onLayout={event => {
                    var { height } = event.nativeEvent.layout
                    this.setState({
                      currentHeight:
                        height >= dimensions.height / 3
                          ? height
                          : dimensions.height / 2.5,
                    })
                  }}
                  style={[
                    styles.flatList,
                    this.state.currentHeight !== 0 && {
                      minHeight: this.state.currentHeight,
                    },
                  ]}
                  contentContainerStyle={{ paddingBottom: 15 }}
                  showsVerticalScrollIndicator={false}
                  data={!this.state.search ? data : this.state.dataSearch}
                  renderItem={this.renderItemDropdown}
                  onEndReachedThreshold={0.1}
                  onMomentumScrollBegin={this.onMomentumScrollBegin}
                  onEndReached={handleLoadMore}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={
                    <Text style={styles.txtEmpty} children="Không có dữ liệu" />
                  }
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (!data.length) {
                    toggleModal()
                    return
                  }
                  const dataSearch = !this.state.search
                    ? data
                    : this.state.dataSearch
                  var indexSelected = -1
                  if (this.state.itemSelected) {
                    indexSelected = dataSearch.findIndex(
                      value =>
                        value[keyExtractor] ===
                        this.state.itemSelected[keyExtractor]
                    )
                  }
                  if (indexSelected === -1) {
                    toggleModal()
                    return
                  }

                  onSelect(indexSelected, this.state.itemSelected)
                  toggleModal()
                }}
                style={styles.btnConfirm}
                children={
                  <Text
                    style={{
                      fontFamily: R.fonts.san_semi_bold,
                      fontSize: 16,
                      color: colors.primary,
                    }}
                    children={R.strings().confirm}
                  />
                }
              />
            </>
          }
        />
      </Modal>
    )
  }
}

if (Array.prototype.equals)
  // console.warn(
  //   "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  // )
  // attach the .equals method to Array's prototype to call it on any array

  Array.prototype.equals = function (array: string | any[]) {
    // if the other array is a falsy value, return
    if (!array) return false

    // compare lengths - can save a lot of time
    if (this.length !== array.length) return false

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) return false
      } else if (this[i] !== array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false
      }
    }
    return true
  }
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', { enumerable: false })
const styles = StyleSheet.create({
  ctn: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingBottom: 10,
  },
  btnConfirm: {
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  txtEmpty: {
    ...fonts.regular16,
    color: colors.border,
    marginVertical: 50,
    alignSelf: 'center',
  },
  flatList: {
    minHeight: 120,
    maxHeight: height / 2,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  label: {
    fontFamily: R.fonts.san_regular,
    fontSize: 14,
    flexDirection: 'row',
  },
  defaultValue: {
    fontSize: 16,
    fontFamily: R.fonts.san_regular,
    color: colors.colorDefault.placeHolder,
    flex: 1,
  },
  containerModal: {
    paddingBottom: 10,
    width: width,
    position: 'absolute',
    left: -20,
    bottom: 0,
    // height: 1000
  },
  line: {
    height: 1,
    backgroundColor: colors.border,
  },
  textStyle: {
    fontFamily: R.fonts.san_semi_bold,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  dropDownStyleHalfWidth: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 11.5,
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  v_item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 11.5,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCheck: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 30,
  },
  textDropdown: {
    ...fonts.regular16,
    paddingLeft: 8,
    flex: 1,
    textAlign: 'left',
  },
  container: {
    width: width - 10,
  },
  dropdownStyle: {
    width: width,
    borderWidth: 0.2,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: Platform.OS === 'android' ? 3 : 0,
    borderColor: 'white',
  },
  icArrow: {
    width: 24,
    height: 24,
  },
  fix: {
    width: width,
    height: height * 0.1,
    backgroundColor: '#000000',
    bottom: -height * 0.0625,
    position: 'absolute',
    opacity: 0.7,
    zIndex: 0,
  },
})
