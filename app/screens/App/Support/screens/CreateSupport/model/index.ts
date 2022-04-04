export interface itemFormSupport {
  id: number
  name: string
}

export interface CreateSupport {
  donate_request_id: number
  phone: string
  name: string
  form_support: number[]
  email: string
  note?: string
}
