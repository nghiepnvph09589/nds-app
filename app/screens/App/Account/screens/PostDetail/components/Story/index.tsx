import reactotron from '@app/config/ReactotronConfig'
import React from 'react'
import { StyleSheet } from 'react-native'
import { DonateCategoryDetails, PostDetailData } from '../../model'
import Content from './components/Content'
import ListSupport from './components/ListSupport'
import Need from './components/Need'
import Position from './components/Position'
import TargetGroup from './components/TargetGroup'
import UserInfo from './components/UserInfo'

interface StoryProps {
  data: PostDetailData
}

const Story = (props: StoryProps) => {
  const { data } = props
  reactotron.log!(data.DonateCategoryDetails)
  return (
    <>
      <Content title={data.title} content={data.content} />
      <ListSupport />
      <UserInfo
        name={data.name}
        gender={data.gender}
        year={data.year_of_birth}
        phone={data.phone}
        address={data.address ? data.address : data.address_google}
      />
      <Position long={data.long} lat={data.lat} />
      <TargetGroup
        data={data?.DonateCategoryDetails?.filter(
          (item: DonateCategoryDetails) => item.type === 1
        )}
      />
      <Need
        data={data?.DonateCategoryDetails?.filter(
          (item: DonateCategoryDetails) => item.type === 2
        )}
      />
    </>
  )
}

export default Story

const styles = StyleSheet.create({})
