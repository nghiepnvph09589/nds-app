import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { MAP_BOX_STYLE } from '@app/config'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
const AddressMap = () => {
  const mapRef = useRef(undefined)
  const cameraRef = useRef(undefined)
  const { lat, long } = useAppSelector(state => state.locationReducer)
  const [annotationPoint, setAnnotationPoint] = useState(
    long ? [long, lat] : undefined
  )

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
          </MapboxGL.MapView>
          <View style={{ backgroundColor: 'white' }}>
            <RNButton
              onPress={() => {}}
              style={styles.v_button}
              title={'Chọn vị trí'}
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
    //marginTop: 32,
  },
})
