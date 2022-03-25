interface dataSupportDetail {
  name: string
  phone: string
  note: string
  form_support: { id: number; name: string }[]
  DonateRequest: {
    id: number
    DonateRequestMedia: {
      media_url: string
    }[]
    title: string
  }
}
