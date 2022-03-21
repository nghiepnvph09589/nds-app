export type ArrayImage = {
  file_name: string
  file_url: string
  type?: number
  urlThumbnail?: string
}

export type CreatePostSlice = {
  title: string
  content: string
  name: string
  phone: string
  gender: number
  year_of_birth: string
  address: string
  lat: number
  long: number
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
