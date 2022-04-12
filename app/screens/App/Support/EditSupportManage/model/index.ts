export interface itemFormSupport {
  id: number
  name: string
}

export interface EditSupport {
  id: number
  params: {
    phone: string
    name: string
    form_support: number[]
    email: string
    note: string
  }
}
