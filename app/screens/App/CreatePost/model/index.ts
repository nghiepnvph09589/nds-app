export type ArrayImage = {
  urlThumbnail?: string
  uri?: string
  name?: string
  type?: string
  typeMedia?: number
}

export type CreatePostSlice = {
  title: string
  content: string
  name: string
  phone: string
  gender: number
  year_of_birth: string
  address: string
  lat: number | null
  long: number | null
  group_id: number
  category: Category[]
  media: Media[]
  province_id: number
  district_id: number
  ward_id: number
}

export type Category = {
  category_id: number
  type: number
}
export type Media = {
  media_url: string
  type: number
}
