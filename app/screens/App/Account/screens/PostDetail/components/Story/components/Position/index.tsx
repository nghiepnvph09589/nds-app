import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { MAP_BOX_STYLE } from '@app/config'
import MapboxGL from '@react-native-mapbox-gl/maps'
import React, { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

interface PositionProps {
  long: number
  lat: number
}

const Position = (props: PositionProps) => {
  const mapRef = useRef(undefined)
  const cameraRef = useRef(undefined)
  const { lat, long } = props
  // const [annotationPoint, setAnnotationPoint] = useState(
  //   long ? [long, lat] : undefined
  // )
  console.log(long, lat)

  const defaultCamera = {
    centerCoordinate: [105.784883, 21.028073],
    zoomLevel: 12,
  }
  return (
    <View style={styles.v_container}>
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
          minZoomLevel={10}
          maxZoomLevel={18}
          padding={{ paddingBottom: 100 }}
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
