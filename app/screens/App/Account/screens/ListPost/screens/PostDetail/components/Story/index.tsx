import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Content from './components/Content'
import BankInfo from './components/BankInfo'
import UserInfo from './components/UserInfo'
import Position from './components/Position'
import TargetGroup from './components/TargetGroup'
import Need from './components/Need'
import ListSupport from './components/ListSupport'

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
