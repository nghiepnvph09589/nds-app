import R from '@app/assets/R'
import { AutocompleteDropdown } from '@app/components/AutocompleteDropdown'
import FstImage from '@app/components/FstImage'
import RNButton from '@app/components/RNButton/RNButton'
import { MAP_BOX_STYLE } from '@app/config'
import reactotron from '@app/config/ReactotronConfig'
import { api_key, GOONG_HOST } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
import MapboxGL from '@react-native-mapbox-gl/maps'
import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from 'react-native-iphone-x-helper'

interface AddressMapProps {
  route: {
    params: {
      onCallBack: ({ lt, lng }: { lt: number; lng: number }) => void
      onSetAddress: ({ addressLocation }: { addressLocation: string }) => void
    }
  }
}
const AddressMap = (props: AddressMapProps) => {
  const dataPost = useAppSelector(state => state.updatePostReducer)
  const mapRef = useRef(undefined)
  const cameraRef = useRef(undefined)
  const { lat, long } = useAppSelector(state => state.locationReducer)
  const [suggestionsList, setSuggestionsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [centerCoordinate, setCenterCoordinate] = useState(
    dataPost.long !== 0 ? [dataPost.long, dataPost.lat] : [long, lat]
  )
  const location = useRef<any>([])
  const isSearchLocation = useRef<boolean>(false)
  const isPressLocation = useRef<boolean>(false)

  const defaultCamera = {
    centerCoordinate:
      dataPost.long !== 0
        ? [dataPost.long, dataPost.lat]
        : long
        ? [long, lat]
        : [105.784883, 21.028073],
    zoomLevel: 12,
  }
  const dropdownController = useRef(null)

  const getSuggestions = useCallback(async text => {
    console.log('getSuggestions', text)
    try {
      const res = (
        await axios.get(`${GOONG_HOST}Place/AutoComplete`, {
          params: {
            api_key: api_key,
            input: text,
            limit: 20,
            radius: 1000,
          },
        })
      ).data
      reactotron.log!(res.predictions)
      if (res.predictions) {
        const suggestions = res.predictions.map((item: any, index: number) => ({
          id: index,
          title: item.description,
          place_id: item.place_id,
        }))
        setSuggestionsList(suggestions)
      } else {
        setSuggestionsList([])
      }
    } catch (error) {
    } finally {
    }
  }, [])

  const onSelectItem = async (item: any) => {
    item && setSelectedItem(item)
    isSearchLocation.current = true
    console.log(item)
    try {
      const res = (
        await axios.get(`${GOONG_HOST}Place/Detail`, {
          params: {
            api_key: api_key,
            place_id: item.place_id,
          },
        })
      ).data
      setCenterCoordinate(() => {
        return [105.784883, 21.028073]
      })
      setCenterCoordinate(() => {
        return [
          res.result.geometry.location.lng,
          res.result.geometry.location.lat,
        ]
      })
      location.current = [
        res.result.geometry.location.lng,
        res.result.geometry.location.lat,
      ]
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    getAutoCompleteLocation(centerCoordinate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAutoCompleteLocation = async (locationAddress: any) => {
    setIsLoading(true)
    try {
      const res = (
        await axios.get(`${GOONG_HOST}Geocode`, {
          params: {
            api_key: api_key,
            latlng: `${locationAddress[1]},${locationAddress[0]}`,
          },
        })
      ).data
      console.log(res.results[0].formatted_address)
      const item = { title: res.results[0].formatted_address }
      setSelectedItem(item)
      //setCenterCoordinate(locationAddress)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.v_container}>
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
          //dropdownController.current.clear()
        }}
        onRegionIsChanging={() => {}}
        onRegionDidChange={feature => {
          console.log(feature)
          setIsLoading(false)
          if (!isSearchLocation.current) {
            if (!isPressLocation.current) {
              getAutoCompleteLocation(feature.geometry.coordinates)
              location.current = feature.geometry.coordinates
            }
          }
          setTimeout(() => {
            isSearchLocation.current = false
            isPressLocation.current = false
          }, 2000)
        }}
      >
        <MapboxGL.Camera
          ref={useCallback(r => {
            cameraRef.current = r
          }, [])}
          defaultSettings={defaultCamera}
          animationMode={'moveTo'}
          animationDuration={10}
          minZoomLevel={2}
          maxZoomLevel={100}
          centerCoordinate={centerCoordinate}
        />
        {/* <MapboxGL.MarkerView id="marker" coordinate={[long, lat]}>
          <FstImage
            style={styles.ic_marker}
            resizeMode="contain"
            source={R.images.ic_annotation}
          />
        </MapboxGL.MarkerView> */}
      </MapboxGL.MapView>
      <View style={[styles.v_bar, Platform.select({ ios: { zIndex: 1 } })]}>
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.goBack()
          }}
        >
          <FstImage style={styles.ic_back} source={R.images.ic_arrow_left} />
        </TouchableOpacity>
        <AutocompleteDropdown
          controller={(controller: any) => {
            dropdownController.current = controller
          }}
          onClear={() => {
            setSuggestionsList([])
          }}
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
          suggestionsListMaxHeight={400}
          rightButtonsContainerStyle={styles.rightButtonsContainer}
          suggestionsListContainerStyle={styles.suggestionsListContainer}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          useFilter={false}
          clearOnFocus={true}
          closeOnBlur={true}
          onSelectItem={(item: any) => {
            onSelectItem(item)
          }}
          onChangeText={getSuggestions}
          dataSet={suggestionsList}
          emptyResultText="Danh sách trống"
        />
      </View>
      <FstImage
        style={styles.ic_marker}
        resizeMode="contain"
        source={R.images.ic_annotation}
      />
      <TouchableOpacity
        onPress={() => {
          isPressLocation.current = true
          location.current = [long, lat]
          getAutoCompleteLocation([long, lat])
          setCenterCoordinate(prevState => {
            return [105.784883, 21.028073]
          })
          setCenterCoordinate(prevState => {
            return [long, lat]
          })
        }}
        style={styles.v_current_location}
      >
        <FstImage
          style={styles.ic_current_location}
          resizeMode="contain"
          source={R.images.ic_current_location}
        />
      </TouchableOpacity>

      <View style={styles.v_bottom}>
        <Text style={styles.txt_label}>Ví trí được chọn</Text>
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={styles.vIndicator}
          />
        ) : (
          <View style={styles.v_location}>
            <FstImage
              resizeMode="contain"
              style={styles.icon}
              source={R.images.ic_dot_red}
            />
            <Text numberOfLines={3} style={styles.txt_location}>
              {selectedItem?.title}
            </Text>
          </View>
        )}
        <RNButton
          onPress={() => {
            console.log(location.current)
            props.route.params.onCallBack({
              lt: location.current[1],
              lng: location.current[0],
            })
            props.route.params.onSetAddress({
              addressLocation: selectedItem.title,
            })
            NavigationUtil.goBack()
          }}
          style={styles.v_button}
          title={isLoading ? 'Đang tìm vị trí' : 'Chọn vị trí'}
        />
      </View>
    </View>
  )
}

export default AddressMap

const styles = StyleSheet.create({
  vIndicator: {
    marginVertical: 20,
  },
  txt_location: {
    flex: 1,
    marginLeft: 15,
    color: colors.text,
    ...fonts.regular16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  v_location: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF4F4',
    borderWidth: 1,
    borderColor: '#F7D3D1',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 24,
    marginBottom: 40,
  },
  txt_label: {
    ...fonts.regular16,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
  },
  v_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
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
    position: 'absolute',
    top: 0,
    bottom: 200,
    left: 0,
    right: 0,
  },
  v_button: {
    marginHorizontal: 33,
    height: 45,
    marginTop: 10,
    marginBottom:
      Platform.OS !== 'ios' ? 10 : isIphoneX() ? getBottomSpace() : 10,
  },
  ic_marker: {
    width: 50,
    height: 50,
    marginBottom: 220,
  },
  v_bottom: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  v_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: isIphoneX() ? getStatusBarHeight() + 20 : getStatusBarHeight(),
    left: 15,
    right: 15,
  },
  v_current_location: {
    position: 'absolute',
    right: 0,
    bottom: 300,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9.11,
    elevation: 6,
  },
  ic_current_location: {
    width: 100,
    height: 100,
  },
})
