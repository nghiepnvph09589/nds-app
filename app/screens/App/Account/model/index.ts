export type AccountType = {
  id: number
  user_name: string
  name: string
  phone: string
  email: string
  status: number
  profile_picture_path: string
  profile_picture_url: string
  id_card?: string
  birthday?: string
  gender?: number
  address?: string
  role: number
  donate: number
  post: number
}
export type AccountSlice = {
  isError: boolean
  isLoading: boolean
  data: AccountType
}
