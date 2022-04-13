interface dataSupportDetail {
  id: number
  name: string
  phone: string
  note: string
  email: string
  create_at: string
  is_update: number
  content: string
  form_support: { id: number; name: string }[]
  DonateRequest: {
    id: number
    DonateRequestMedia: {
      media_url: string
    }[]
    title: string
  }
  status: number
  title: string
  DonateImages: any[]
  end_date?: string
  province_id: number
  district_id: number
}
