import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { MAP_BOX_STYLE } from '@app/config'
import { LinkingMaps } from '@app/utils/LinkingUtils'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React, { useCallback, useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface PositionProps {
  long: number
  lat: number
}

const Position = (props: PositionProps) => {
  const mapRef = useRef(undefined)
  const cameraRef = useRef(undefined)
  const { lat, long } = props
  console.log(long, lat)

  const defaultCamera = {
    centerCoordinate: [105.784883, 21.028073],
    zoomLevel: 12,
  }
  return (
    <TouchableOpacity
      onPress={() => {
        LinkingMaps('', long, lat)
      }}
      style={styles.v_container}
    >
      <MapboxGL.MapView
        style={styles.map}
        scrollEnabled={false}
        logoEnabled={false}
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
          minZoomLevel={16}
          maxZoomLevel={18}
          centerCoordinate={[long, lat]}
        />
        <MapboxGL.MarkerView id="pointAnno" coordinate={[long, lat]}>
          <FstImage
            style={styles.icon}
            resizeMode="contain"
            source={R.images.ic_annotation}
          />
        </MapboxGL.MarkerView>
      </MapboxGL.MapView>
    </TouchableOpacity>
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
