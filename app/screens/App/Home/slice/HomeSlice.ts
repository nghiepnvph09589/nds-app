import { HomePayload } from '@app/service/Network/model/ApiPayload'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import HomeApi from '../api/HomeApi'
import { HomeSlice } from '../model'

const initState: HomeSlice = {
  isError: false,
  isLoading: false,
  data: {
    listPost: [],
  },
}

export const getDataHome = createAsyncThunk(
  'DataHomeSlice',
  async (payload: HomePayload) => {
    const res = await HomeApi.getHome(payload)
    return res
  }
)
const dataHomeSlice = createSlice({
  name: 'DataHomeSlice',
  initialState: initState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getDataHome.pending, state => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(getDataHome.fulfilled, (state, action) => {
      state.data = action.payload?.data
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getDataHome.rejected, state => {
      state.isError = true
      state.isLoading = false
    })
  },
})

export const {} = dataHomeSlice.actions
export default dataHomeSlice.reducer
