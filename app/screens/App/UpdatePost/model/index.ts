export type ArrayImage = {
  urlThumbnail?: string
  uri?: string
  name?: string
  type?: string
  typeMedia?: number
}

export type UpdatePostSlice = {
  id?: string
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
  new_category: Category[]
  new_media: Media[]
  province_id: number
  district_id: number
  ward_id: number
  province_name: string
  district_name: string
  ward_name: string
}

// "content": "string",
//   "name": "string",
//   "phone": "string",
//   "gender": 0,
//   "year_of_birth": "string",
//   "address_google": "string",
//   "address": "string",
//   "lat": 0,
//   "long": 0,
//   "group_id": 0,
//   "new_media": [
//     {
//       "media_url": "string",
//       "type": 0
//     }
//   ],
//   "new_category": [
//     {
//       "category_id": 0,
//       "type": 0
//     }
//   ],
//   "new_bank_info": [
//     {
//       "bank_name": "string",
//       "branch_name": "string",
//       "account_name": "string",
//       "account_number": "string",
//       "type": 0
//     }
//   ]

export type Category = {
  category_id: number
  type: number
}
export type Media = {
  media_url: string
  type: number
  url?: string
  urlVideo?: string
}
export type Bank = {
  bank_name: string
  branch_name: string
  account_name: string
  account_number: string
  type: number
}
