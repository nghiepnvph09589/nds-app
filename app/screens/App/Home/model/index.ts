import { Source } from 'react-native-fast-image'

export type Banners = {
  id: number
  image_url: number | Source
}
export type HomeSlice = {
  isError: boolean
  isLoading: boolean
  isLastPage: boolean
  isLoadMore: boolean
  data: HomeType
}
export type HomeType = {
  listPost: ListPostData[]
}
export type ListPostData = {
  phone: string
  id: number
  name: string
  title: string
  content: string
  create_at: Date
  create_by: string
  profile_picture_path: string
  profile_picture_url: string
  DonateRequestMedia: DonateRequestMedia[]
  Donates: any[]
  User: {
    role: number
    name: string
    profile_picture_url: string
    profile_picture_path: string
  }
  DFProvince: {
    id: number
    name: string
    value: string
  }
  DFDistrict: {
    id: number
    name: string
    value: string
  }
  DFWard: {
    id: number
    name: string
    value: string
  }
  status: number
  end_date: Date
}
export type DonateRequestMedia = {
  id: string
  type: string
  media_url: string
}
