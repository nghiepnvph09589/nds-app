export type AccountType = {
  id: number
  user_name: string
  name: string
  phone: string
  email: string
  status: number
  profile_picture_path: string
  profile_picture_url: string
}
export type AccountSlice = {
  isError: boolean
  isLoading: boolean
  data: AccountType
}
