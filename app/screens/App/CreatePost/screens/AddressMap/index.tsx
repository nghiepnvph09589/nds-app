/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import RNButton from '@app/components/RNButton/RNButton'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { MAP_BOX_STYLE } from '@app/config'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

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
  const [annotationPoint, setAnnotationPoint] = useState(
    dataPost.long !== 0
      ? [dataPost.long, dataPost.lat]
      : long
      ? [long, lat]
      : [105.784883, 21.028073]
  )
  const [isLoading, setIsLoading] = useState(false)

  const defaultCamera = {
    centerCoordinate: [105.784883, 21.028073],
    zoomLevel: 12,
  }
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().address}
      children={
        <>
          <MapboxGL.MapView
            style={styles.map}
            styleURL={MAP_BOX_STYLE}
            ref={useCallback(r => {
              mapRef.current = r
            }, [])}
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
              padding={{ paddingBottom: 100 }}
              centerCoordinate={annotationPoint}
            />
            <MapboxGL.MarkerView
              onDragStart={() => setIsLoading(true)}
              onDragEnd={(props: any) => {
                setAnnotationPoint(props.geometry.coordinates)
                console.log(props.geometry.coordinates)
                setIsLoading(false)
              }}
              draggable={true}
              id="pointAnno"
              coordinate={annotationPoint}
            >
              <FstImage
                style={{
                  width: 50,
                  height: 50,
                  //transform: [{ rotate: `${(props.bearing || 0) - 90}deg` }],
                }}
                resizeMode="contain"
                source={R.images.ic_annotation}
              />
            </MapboxGL.MarkerView>
          </MapboxGL.MapView>
          <View style={{ backgroundColor: 'white' }}>
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
        </>
      }
    />
  )
}

export default AddressMap

const styles = StyleSheet.create({
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
    marginBottom: 10,
    //marginTop: 32,
  },
})
