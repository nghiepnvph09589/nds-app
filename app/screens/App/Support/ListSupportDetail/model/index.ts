export interface getListSupport {
  id: number
  params: {
    page: number
    limit: number
  }
}

export interface itemListSupportPost {
  id: number
  title: string
  create_at: string
  DonateImages: {
    url: string
    type: number
    media_url: string
  }[]
}
