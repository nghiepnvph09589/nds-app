import { colors } from '@app/theme'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Header from './components/Header'
import ListPost from './components/ListPost'

const Home = () => {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <View style={styles.v_container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header />
      <ListPost />
    </View>
  )
}
const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
})

export default Home
