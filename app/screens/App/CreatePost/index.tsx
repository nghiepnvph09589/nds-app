import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors } from '@app/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import StepIndicator from 'react-native-step-indicator'
import Swiper from 'react-native-swiper'
import ViewBottom from './components/ViewBottom'
import CreatPostStep1 from './screens/CreatePostStep1'
import CreatePostStep2 from './screens/CreatePostStep2'
import CreatePostStep3 from './screens/CreatePostStep3'
const CreatePost = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0)
  const PAGES = ['Page 1', 'Page 2', 'Page 3']
  //const userInfo = useAppSelector(state => state.accountReducer.data)
  const onStepPress = (position: number) => {
    setCurrentPage(position)
  }

  const onBack = () => {
    if (currentPage === 0) {
      NavigationUtil.goBack()
    } else {
      setCurrentPage(prevState => {
        return prevState - 1
      })
    }
  }

  const onNext = () => {
    if (currentPage !== 2) {
      setCurrentPage(prevState => {
        return prevState + 1
      })
    }
  }

  const getStepIndicatorIconConfig = ({
    position,
  }: {
    position: number
    stepStatus: string
  }) => {
    const iconConfig = {
      source: R.images.ic_image2,
    }
    switch (position) {
      case 0: {
        iconConfig.source = R.images.ic_image2
        break
      }
      case 1: {
        iconConfig.source = R.images.ic_recipient
        break
      }
      case 2: {
        iconConfig.source = R.images.ic_location5
        break
      }

      default: {
        iconConfig.source = R.images.ic_image2
      }
    }
    return iconConfig.source
  }
  const renderStepIndicator = (params: {
    position: number
    stepStatus: string
  }) => (
    <FastImage
      resizeMode="contain"
      tintColor={params.stepStatus !== 'unfinished' ? 'white' : '#8898A7'}
      style={styles.icon}
      source={getStepIndicatorIconConfig(params)}
    />
  )

  return (
    <ScreenWrapper
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Đăng tin'}
      children={
        <>
          <View style={styles.v_container}>
            <View style={styles.indicator}>
              <StepIndicator
                stepCount={3}
                customStyles={secondIndicatorStyles}
                currentPosition={currentPage}
                onPress={onStepPress}
                renderStepIndicator={renderStepIndicator}
                labels={['Ảnh/video', 'Người nhận', 'Địa điểm']}
              />
            </View>
            <Swiper
              style={styles.v_swiper}
              loop={false}
              scrollEnabled={false}
              index={currentPage}
              autoplay={false}
              showsButtons={false}
              showsPagination={false}
              onIndexChanged={page => {
                setCurrentPage(page)
              }}
            >
              {PAGES.map((value, index) => (
                <>
                  {index === 0 ? (
                    <CreatPostStep1 />
                  ) : index === 1 ? (
                    <CreatePostStep2 />
                  ) : (
                    <CreatePostStep3 />
                  )}
                </>
              ))}
            </Swiper>
          </View>
          <ViewBottom onBack={onBack} onNext={onNext} />
        </>
      }
    />
  )
}

const secondIndicatorStyles = {
  backgroundColor: 'white',
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeWidth: 1,
  separatorStrokeFinishedWidth: 2,
  stepStrokeCurrentColor: colors.primary,
  stepStrokeFinishedColor: colors.primary,
  stepStrokeUnFinishedColor: '#ADB5BD',
  separatorFinishedColor: colors.primary,
  separatorUnFinishedColor: '#ADB5BD',
  stepIndicatorFinishedColor: colors.primary,
  stepIndicatorUnFinishedColor: '#E9ECEF',
  stepIndicatorCurrentColor: colors.primary,
  labelColor: colors.text,
  labelSize: 13,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  currentStepLabelColor: colors.primary,
}

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  line: {
    backgroundColor: colors.backgroundColor,
    height: 1.5,
  },
  icon: {
    width: 22,
    height: 22,
  },
  indicator: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 15,
  },
  v_swiper: {
    flexGrow: 1,
  },
})

export default CreatePost
