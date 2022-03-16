import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { dimension } from '@app/constant/Theme'
import React from 'react'
import { Text } from 'react-native'
import Video from 'react-native-video'
const NotificationScreen = () => {
  return (
    <ScreenWrapper
      back
      titleHeader="Noti"
      children={
        <Video
          controls
          //ref={videoRef}
          //paused={videoPause}
          //onLoad={onVideoLoad}
          source={{
            uri: 'https://dev.ndsapi.winds.vn/uploads/video/video_5fac1a28306f4ddfb03f389c2f2de1d8.mp4',
          }}
          style={{
            width: dimension.width,
            aspectRatio: 1,
            alignSelf: 'center',
            position: 'absolute',
            //top: 10,
            left: 0,
            right: 0,
          }}
        />
      }
    />
  )
}

export default NotificationScreen
