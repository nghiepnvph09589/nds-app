export interface RegisterPayload {
  phone: string
  password: string
  last_name: string
  first_name: string
}
export interface LoginPayload {
  phone: string
  password: string
}

export interface CheckAccountPayload {
  user_name: string
}
