import React from 'react'
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
  return (
    <>
      {data.status === 3 && <ListSupport count={0} id={data?.id} />}

      <Content title={data?.title} content={data?.content} />
      <UserInfo
        name={data.name}
        gender={data.gender}
        year={data.year_of_birth}
        phone={data.phone}
        address={` ${data?.address}, ${data?.DFWard?.name}, ${data?.DFDistrict?.name}, ${data?.DFProvince?.name}`}
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
