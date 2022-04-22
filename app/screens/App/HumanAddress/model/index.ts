import { DonateRequestMedia } from '../../Home/model'

export type HumanAddressSlice = {
  isError: boolean
  isLoading: boolean
  isLastPage: boolean
  isLoadMore: boolean
  data: HumanAddressType[]
}
export type HumanAddressType = {
  id: number
  title: string
  content: string
  name: string
  gender: number
  address: string
  year_of_birth: number
  address_google: string
  phone: string
  district_post: number
  is_update: number
  group_id: number
  is_active: number
  is_status: number
  status: number
  create_at: string
  DonateRequestMedia: DonateRequestMedia[]
}
