export type PostDetailData = {
  id: number
  name: string
  title: string
  content: string
  address: string
  reason_request?: string
  address_google: string
  long: number
  lat: number
  province_id: number
  district_id: number
  ward_id: number
  user_id: number
  group_id: number
  phone: number
  gender: number
  year_of_birth: number
  reason: string
  is_update: number
  status: number
  group_name: number
  DonateRequestMedia: DonateRequestMedia[]
  DonateCategoryDetails: DonateCategoryDetails[]
  BankInfos: BankInfos[]
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
export type BankInfos = {
  id: number
  donate_request_id: number
  bank_id: number
  branch_name: string
  account_name: string
  account_number: number
  type: number
  DFBank: {
    id: number
    name: string
    key: number
  }
}

export type DonateRequestMedia = {
  id: string
  type: string
  media_url: string
  media_path: string
}
export type DonateCategoryDetails = {
  id: number
  category_id: number
  category_name: string
  type: number
}
