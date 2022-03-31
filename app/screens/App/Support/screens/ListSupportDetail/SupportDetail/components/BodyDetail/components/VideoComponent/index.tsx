import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { colors, dimensions, fonts } from '@app/theme'

import R from '@app/assets/R'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Video from 'react-native-video'
import { useNavigation } from '@react-navigation/native'

const VideoComponent = ({ data }: { data?: dataSupportDetail }) => {
  const listVideo = data?.DonateImages.filter(item => item?.type === 2)
  const [videoPause, setVideoPause] = useState<boolean>(false)
  const playerRef = useRef<Video>(null)
  const [showMediaControl, setShowMediaControl] = useState<boolean>(false)
  const controlFadeValue = useSharedValue(0)
  const toggleControl = () => setShowMediaControl(prev => !prev)
  const controlsHider = useRef<any>(0)
  const doubleTapRef = useRef()
  const AnimatedImage = Animated.createAnimatedComponent(Image)
  const rotateRefreshValue = useSharedValue(0)
  useEffect(() => {
    toggleControl()
  }, [])
  const onRefreshPress = () => {
    playerRef.current?.seek(0)
  }
  useEffect(() => {
    controlFadeValue.value = withTiming(showMediaControl ? 1 : 0, {
      duration: 400,
    })
    if (showMediaControl) {
      clearTimeout(controlsHider.current)
      controlsHider.current = setTimeout(() => {
        setShowMediaControl(false)
      }, 3000)
    }
    return () => {
      clearTimeout(controlsHider.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMediaControl])
  const navigation = useNavigation()
  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setVideoPause(true)
    })
    return unsubscribe
  }, [navigation])
  const onPlayButtonPress = () => {
    setVideoPause!(!videoPause)
  }
  const handleRotation = (rotateValue: Animated.SharedValue<number>) => {
    'worklet'
    if (rotateValue.value === 1) rotateValue.value = 0
    return `-${rotateValue.value * Math.PI * 2}rad`
  }
  const animatedControlStyle = useAnimatedStyle(() => ({
    opacity: controlFadeValue.value,
  }))

  const animatedRefreshButton = useAnimatedStyle(() => ({
    transform: [{ rotate: handleRotation(rotateRefreshValue) }],
  }))
  return (
    <View style={styles.ctn}>
      <Text style={styles.title} children={'Video thực tế'} />
      {/* <Video
        ref={playerRef}
        paused={videoPause}
        source={{
          uri: 'https://v16-webapp.tiktok.com/8be04808b25d712c4206d09d560b918a/62447649/video/tos/alisg/tos-alisg-pve-0037/2509741449514d1e899091f0c1aeeb67/?a=1988&br=2202&bt=1101&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-3LGnz7Th0DHzDXq&l=202203300923570102451361031D970AED&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=MzducGg6ZmY3OjMzODgzNEApNmk6ODgzOGVoNzY0NTk8N2dkNWNmcjRnaWBgLS1kLy1zc2A2NDRhL2I2NTQtNjZgLzU6Yw%3D%3D&vl=&vr=',
        }}
        style={styles.backgroundVideo}
        controls
        muted={true}
      /> */}
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => toggleControl()}
      >
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          // onActivated={doubleTap}
        >
          <View style={styles.wrapper}>
            <Animated.View
              style={[styles.controls, animatedControlStyle]}
              pointerEvents={showMediaControl ? undefined : 'none'}
            >
              <View style={styles.centerControl}>
                <TapGestureHandler
                  onActivated={onPlayButtonPress}
                  children={
                    <AnimatedImage
                      style={styles.icon}
                      source={
                        !videoPause ? R.images.ic_pause : R.images.ic_play
                      }
                    />
                  }
                />
                <TapGestureHandler
                  onActivated={onRefreshPress}
                  children={
                    <AnimatedImage
                      style={[styles.icon, animatedRefreshButton]}
                      source={R.images.ic_refresh}
                    />
                  }
                />
              </View>
            </Animated.View>
            <Video
              ref={playerRef}
              paused={videoPause}
              source={{
                uri: 'https://v16-webapp.tiktok.com/8be04808b25d712c4206d09d560b918a/62447649/video/tos/alisg/tos-alisg-pve-0037/2509741449514d1e899091f0c1aeeb67/?a=1988&br=2202&bt=1101&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-3LGnz7Th0DHzDXq&l=202203300923570102451361031D970AED&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=MzducGg6ZmY3OjMzODgzNEApNmk6ODgzOGVoNzY0NTk8N2dkNWNmcjRnaWBgLS1kLy1zc2A2NDRhL2I2NTQtNjZgLzU6Yw%3D%3D&vl=&vr=',
              }}
              style={styles.backgroundVideo}
              // controls
              muted={true}
            />
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  )
}
export default VideoComponent
const styles = StyleSheet.create({
  ctn: {
    marginTop: 17,
  },
  title: {
    ...fonts.regular15,
    color: colors.textColor.gray8,
  },
  backgroundVideo: {
    marginTop: 17,
    width: dimensions.width - 46,
    height: dimensions.width - 46,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  centerControl: {
    width: 130,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderRadius: 3,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
})
