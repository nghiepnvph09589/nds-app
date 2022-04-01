import { createSlice } from '@reduxjs/toolkit'
import { UpdatePostSlice } from '../model'

const initState: UpdatePostSlice = {
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
  new_category: [],
  new_media: [],
  province_id: 0,
  district_id: 0,
  ward_id: 0,
  province_name: '',
  district_name: '',
  ward_name: '',
}

const updatePostSlice = createSlice({
  name: 'UpdatePostSlice',
  initialState: initState,
  reducers: {
    updateDataPost: (state, action) => {
      state = { ...state, ...action.payload }
      return state
    },
    clearDataPost: state => {
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
        new_category: [],
        new_media: [],
        province_id: 0,
        district_id: 0,
        ward_id: 0,
        province_name: '',
        district_name: '',
        ward_name: '',
      }
      return state
    },
  },
})

export const { updateDataPost, clearDataPost } = updatePostSlice.actions
export default updatePostSlice.reducer
