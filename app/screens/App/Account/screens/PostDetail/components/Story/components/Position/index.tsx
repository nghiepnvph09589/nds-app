import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps'
import { MAP_BOX_STYLE } from '@app/config'
import { useAppSelector } from '@app/store'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'

interface PositionProps {
  long: number
  lat: number
}

const Position = (props: PositionProps) => {
  const mapRef = useRef(undefined)
  const cameraRef = useRef(undefined)
  const { lat, long } = props
  const [annotationPoint, setAnnotationPoint] = useState(
    long !== 0 ? [long, lat] : [105.784883, 21.028073]
  )

  const defaultCamera = {
    centerCoordinate: [105.784883, 21.028073],
    zoomLevel: 12,
  }
  return (
    <View style={styles.v_container}>
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
        <MapboxGL.MarkerView id="pointAnno" coordinate={[long, lat]}>
          <FstImage
            style={styles.icon}
            resizeMode="contain"
            source={R.images.ic_annotation}
          />
        </MapboxGL.MarkerView>
      </MapboxGL.MapView>
    </View>
  )
}

export default Position

const styles = StyleSheet.create({
  v_container: { marginHorizontal: 15, marginBottom: 20, marginTop: 4 },
  map: {
    width: '100%',
    aspectRatio: 2.65,
    borderRadius: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
})