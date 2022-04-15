import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { ROLE, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import { showConfirm } from '@app/utils/AlertHelper'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import StepIndicator from 'react-native-step-indicator'
import Swiper from 'react-native-swiper'
import { useDispatch } from 'react-redux'
import CreatPostStep1 from './screens/CreatePostStep1'
import CreatePostStep2 from './screens/CreatePostStep2'
import CreatePostStep3 from './screens/CreatePostStep3'
import { clearDataCreatePost } from './slice/CreatePostSlice'

const CreatePost = () => {
  const dispatch = useDispatch()
  const userInfo = useAppSelector(state => state.accountReducer).data
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [title, setTitle] = useState<string>(R.strings().post)
  const PAGES = ['Page 1', 'Page 2', 'Page 3']

  const onBack = () => {
    setCurrentPage(prevState => {
      if (prevState === 2) {
        setTitle(R.strings().suggest_address)
      } else if (prevState === 1) setTitle(R.strings().post)
      return prevState - 1
    })
  }

  const onNext = () => {
    setCurrentPage(prevState => {
      if (prevState === 0) {
        setTitle(R.strings().suggest_address)
      } else if (prevState === 1) setTitle(R.strings().address)
      return prevState + 1
    })
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
      unsafe
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={title}
      children={
        <>
          <View style={styles.v_container}>
            <View style={styles.indicator}>
              <StepIndicator
                stepCount={3}
                customStyles={secondIndicatorStyles}
                currentPosition={currentPage}
                renderStepIndicator={renderStepIndicator}
                labels={[
                  R.strings().image,
                  R.strings().recipient,
                  R.strings().location,
                ]}
              />
            </View>
            <Swiper
              style={styles.v_swiper}
              loop={false}
              index={currentPage}
              autoplay={false}
              scrollEnabled={false}
              showsButtons={false}
              showsPagination={false}
              onIndexChanged={page => {
                setCurrentPage(page)
              }}
            >
              {PAGES.map((value, index) => (
                <>
                  {index === 0 ? (
                    <CreatPostStep1
                      onBack={() => {
                        showConfirm(
                          R.strings().notification,
                          'Bạn chưa hoàn thiện luồng đăng tin. Bạn có chắc chắn muốn quay lại?',
                          () => {
                            dispatch(clearDataCreatePost())
                            NavigationUtil.goBack()
                          }
                        )
                      }}
                      onNext={onNext}
                    />
                  ) : index === 1 ? (
                    <CreatePostStep2 onBack={onBack} onNext={onNext} />
                  ) : (
                    <CreatePostStep3
                      onBack={onBack}
                      onNext={() => {
                        if (userInfo?.role === ROLE.OFFICER_PROVINCE) {
                          NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_POST, {
                            page: 2,
                          })
                        } else {
                          NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_POST, {
                            page: 0,
                          })
                        }
                      }}
                    />
                  )}
                </>
              ))}
            </Swiper>
          </View>
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
