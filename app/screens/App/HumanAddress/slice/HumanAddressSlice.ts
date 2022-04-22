import { DEFAULT_PARAMS } from '@app/constant/Constant'
import { ListAddressPayload } from '@app/service/Network/model/ApiPayload'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import HumanAddressApi from '../api/HumanAddressApi'
import { HumanAddressSlice } from '../model'

const initState: HumanAddressSlice = {
  isError: false,
  isLoading: false,
  isLastPage: false,
  isLoadMore: false,
  data: [],
}

export const getListAddress = createAsyncThunk(
  'ListAddressSlice',
  async (payload: ListAddressPayload) => {
    const res = await HumanAddressApi.getListAddress(payload)
    return res
  }
)
const humanAddressSlice = createSlice({
  name: 'ListAddressSlice',
  initialState: initState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getListAddress.pending, (state, action) => {
      const page = action.meta.arg.page
      state.isLoading = page === DEFAULT_PARAMS.PAGE
      state.isError = false
      state.isLoadMore = page ? page > 1 : false
      state.isLastPage = false
    })
    builder.addCase(getListAddress.fulfilled, (state, action) => {
      var { page } = action.meta.arg
      const arrayCurrent = action.payload?.data

      var newState = null
      if (page === DEFAULT_PARAMS.PAGE) {
        newState = {
          isLoading: false,
          isLoadMore: false,
          isLastPage: false,
          isError: false,
          data: arrayCurrent,
        }
      } else if (arrayCurrent.length) {
        newState = {
          isLoading: false,
          isLoadMore: false,
          isLastPage: false,
          isError: false,
          data: state.data.concat(arrayCurrent),
        }
      } else {
        newState = {
          data: state.data,
          isLoading: false,
          isLoadMore: false,
          isLastPage: true,
          isError: false,
        }
      }
      return newState
    })
    builder.addCase(getListAddress.rejected, state => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const {} = humanAddressSlice.actions
export default humanAddressSlice.reducer
