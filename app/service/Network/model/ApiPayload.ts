export interface RegisterPayload {
  email: string
  name: string
  address: string
  phone: string
  profile_picture_url: string
}
export interface LoginPayload {
  user_name: string
  password: string
  device_id?: string
}

export interface CheckAccountPayload {
  user_name: string
}
export interface ForgetPassPayload {
  email: string
}
export interface ValidatePassPayload {
  email: string
  password: string
}
export interface ChangePassPayload {
  user_id: string
  new_password: string
}
export interface HomePayload {
  page?: number
  limit?: number
}

export interface ListAddressPayload {
  page?: number
  limit?: number
  startDate?: string
  endDate?: string
  province_id?: number
  district_id?: number
  ward_id?: number
  group_id?: number
  category_id?: [number]
}
