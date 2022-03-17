import { StyleSheet, Text, View } from 'react-native'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'

const CreatePostStep2 = () => {
  return (
    <View>

    </View>
  )
}
const Title = (title: string) => {
  return (
    <View>
      <Text children={title} />
      <FstImage source={R.images.ic_requite} />
    </View>
  )
}

export default CreatePostStep2

const styles = StyleSheet.create({})
