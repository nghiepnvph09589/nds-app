import { DEFAULT_PARAMS } from '@app/constant/Constant'
import { HomePayload } from '@app/service/Network/model/ApiPayload'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import HomeApi from '../api/HomeApi'
import { HomeSlice } from '../model'

const initState: HomeSlice = {
  isError: false,
  isLoading: false,
  isLastPage: false,
  isLoadMore: false,
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
    builder.addCase(getDataHome.pending, (state, action) => {
      const page = action.meta.arg.page
      state.isLoading = page === DEFAULT_PARAMS.PAGE
      state.isError = false
      state.isLoadMore = page ? page > 1 : false
      state.isLastPage = false
    })
    builder.addCase(getDataHome.fulfilled, (state, action) => {
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
      } else if (arrayCurrent.listPost.length) {
        newState = {
          isLoading: false,
          isLoadMore: false,
          isLastPage: false,
          isError: false,
          data: {
            listPost: state.data.listPost.concat(arrayCurrent.listPost),
          },
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
    builder.addCase(getDataHome.rejected, state => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const {} = dataHomeSlice.actions
export default dataHomeSlice.reducer
