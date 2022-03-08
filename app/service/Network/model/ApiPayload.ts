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
}

export interface CheckAccountPayload {
  user_name: string
}
