import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import RNButton from '@app/components/RNButton/RNButton'
import { MAP_BOX_STYLE } from '@app/config'
import reactotron from '@app/config/ReactotronConfig'
import { GOONG_HOST } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import MapboxGL from '@react-native-mapbox-gl/maps'
import axios from 'axios'
import React, { useCallback, useRef, useState } from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from 'react-native-iphone-x-helper'

interface AddressMapProps {
  route: {
    params: { onCallBack: ({ lt, lng }: { lt: number; lng: number }) => void }
  }
}
const AddressMap = (props: AddressMapProps) => {
  const dataPost = useAppSelector(state => state.updatePostReducer)
  const mapRef = useRef(undefined)
  const cameraRef = useRef(undefined)
  const { lat, long } = useAppSelector(state => state.locationReducer)
  const [suggestionsList, setSuggestionsList] = useState([])
  const [annotationPoint, setAnnotationPoint] = useState(
    dataPost.long !== 0
      ? [dataPost.long, dataPost.lat]
      : long
      ? [long, lat]
      : [105.784883, 21.028073]
  )
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const defaultCamera = {
    centerCoordinate: [105.784883, 21.028073],
    zoomLevel: 12,
  }

  const getSuggestions = useCallback(async text => {
    console.log('getSuggestions', text)
    showLoading()
    try {
      const res = (
        await axios.get(`${GOONG_HOST}Place/AutoComplete`, {
          params: {
            api_key: 'F5qwKLv2gvV4UCKXSbN39hVvl0gxYjYKKPigkfLj',
            input: text,
            limit: 20,
            radius: 1000,
          },
        })
      ).data
      const suggestions = res.predictions.map((item: any, index: number) => ({
        id: index,
        title: item.description,
        place_id: item.place_id,
      }))
      setSuggestionsList(suggestions)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }, [])

  const onSelectItem = useCallback(async (item: any) => {
    item && setSelectedItem(item)
    showLoading()
    try {
      const res = (
        await axios.get(`${GOONG_HOST}Place/Detail`, {
          params: {
            api_key: 'F5qwKLv2gvV4UCKXSbN39hVvl0gxYjYKKPigkfLj',
            place_id: item.place_id,
          },
        })
      ).data
      reactotron.log!(res)
      setAnnotationPoint([res.geometry.location.lng, res.geometry.location.lat])
    } catch (error) {
    } finally {
      hideLoading()
    }
  }, [])

  return (
    <>
      <MapboxGL.MapView
        preferredFramesPerSecond={1000}
        animated={true}
        style={styles.map}
        styleURL={MAP_BOX_STYLE}
        ref={useCallback(r => {
          mapRef.current = r
        }, [])}
        onRegionWillChange={() => {
          setIsLoading(true)
        }}
        onRegionIsChanging={feature => {
          setAnnotationPoint(feature.geometry.coordinates)
        }}
        onRegionDidChange={feature => {
          setAnnotationPoint(feature.geometry.coordinates)
          setIsLoading(false)
        }}
      >
        <MapboxGL.Camera
          ref={useCallback(r => {
            cameraRef.current = r
          }, [])}
          defaultSettings={defaultCamera}
          animationMode={'moveTo'}
          animationDuration={0}
          minZoomLevel={10}
          maxZoomLevel={18}
          centerCoordinate={
            dataPost.long !== 0
              ? [dataPost.long, dataPost.lat]
              : long
              ? [long, lat]
              : [105.784883, 21.028073]
          }
        />
        <MapboxGL.MarkerView id="marker" coordinate={annotationPoint}>
          <FstImage
            style={styles.ic_marker}
            resizeMode="contain"
            source={R.images.ic_annotation}
          />
        </MapboxGL.MarkerView>
      </MapboxGL.MapView>
      <View style={styles.v_bottom}>
        <RNButton
          isLoading={isLoading}
          onPress={() => {
            console.log(annotationPoint[1])
            props.route.params.onCallBack({
              lt: annotationPoint[1],
              lng: annotationPoint[0],
            })
            NavigationUtil.goBack()
          }}
          style={styles.v_button}
          title={isLoading ? 'Đang tìm vị trí' : 'Chọn vị trí'}
        />
      </View>
      <View style={[styles.v_bar, Platform.select({ ios: { zIndex: 1 } })]}>
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.goBack()
          }}
        >
          <FstImage style={styles.ic_back} source={R.images.ic_arrow_left} />
        </TouchableOpacity>
        <AutocompleteDropdown
          direction={Platform.select({ ios: 'down' })}
          debounce={600}
          textInputProps={{
            placeholder: 'Tìm kiếm địa chỉ ...',
            style: {
              borderRadius: 12,
              backgroundColor: '#fff',
              color: colors.text,
              paddingLeft: 18,
              ...fonts.regular16,
            },
          }}
          rightButtonsContainerStyle={styles.rightButtonsContainer}
          suggestionsListContainerStyle={styles.suggestionsListContainer}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          useFilter={false}
          clearOnFocus={false}
          closeOnBlur={true}
          onSelectItem={(item: any) => {
            onSelectItem(item)
          }}
          onChangeText={getSuggestions}
          dataSet={suggestionsList}
        />
      </View>
    </>
  )
}

export default AddressMap

const styles = StyleSheet.create({
  containerStyle: { flexGrow: 1, flexShrink: 1 },

  inputContainerStyle: {
    backgroundColor: 'transparent',
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.46,
    elevation: 13,
  },
  suggestionsListContainer: {
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  rightButtonsContainer: {
    right: 8,
    height: 30,
    top: 6,
    backgroundColor: '#fff',
  },
  ic_back: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
  v_button: {
    marginHorizontal: 33,
    height: 45,
    marginTop: 10,
    marginBottom:
      Platform.OS !== 'ios' ? 10 : isIphoneX() ? getBottomSpace() : 10,
    //marginTop: 32,
  },
  ic_marker: {
    width: 50,
    height: 50,
  },
  v_bottom: {
    backgroundColor: 'white',
  },
  v_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: getStatusBarHeight() + 20,
    left: 15,
    right: 15,
  },
})
