import { Source } from 'react-native-fast-image'

export type Banners = {
  id: number
  image_url: number | Source
}
export type HomeSlice = {
  isError: boolean
  isLoading: boolean
  data: HomeType
}
export type HomeType = {
  listPost: ListPostData[]
}
export type ListPostData = {
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
}
export type DonateRequestMedia = {
  id: string
  type: string
  media_url: string
}
