import { createSlice } from '@reduxjs/toolkit'
import { CreatePostSlice } from '../model'

const initState: CreatePostSlice = {
  title: '',
  content: '',
  name: '',
  phone: '',
  gender: 0,
  year_of_birth: '',
  address: '',
  lat: 0,
  long: 0,
  group_id: 0,
  category: [],
  media: [],
  province_id: 0,
  district_id: 0,
  ward_id: 0,
}

const createPostSlice = createSlice({
  name: 'CreatePostSlice',
  initialState: initState,
  reducers: {
    updateDataCreatePost: (state, action) => {
      state = { ...state, ...action.payload }
      return state
    },
    clearDataCreatePost: state => {
      state = {
        title: '',
        content: '',
        name: '',
        phone: '',
        gender: 0,
        year_of_birth: '',
        address: '',
        lat: 0,
        long: 0,
        group_id: 0,
        category: [],
        media: [],
        province_id: 0,
        district_id: 0,
        ward_id: 0,
      }
      return state
    },
  },
})

export const { updateDataCreatePost, clearDataCreatePost } =
  createPostSlice.actions
export default createPostSlice.reducer
