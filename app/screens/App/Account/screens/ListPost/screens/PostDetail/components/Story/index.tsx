import React from 'react'
import { StyleSheet } from 'react-native'
import Content from './components/Content'
import ListSupport from './components/ListSupport'
import Need from './components/Need'
import Position from './components/Position'
import TargetGroup from './components/TargetGroup'
import UserInfo from './components/UserInfo'

const Story = () => {
  return (
    <>
      <Content />
      <ListSupport />
      <UserInfo />
      <Position />
      <TargetGroup />
      <Need />
    </>
  )
}

export default Story

const styles = StyleSheet.create({})
