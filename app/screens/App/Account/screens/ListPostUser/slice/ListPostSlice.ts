import { DEFAULT_PARAMS } from '@app/constant/Constant'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ListPostApi from '../api/ListPostApi'
import { ListPostData } from '../model'

type ListPostSlice = {
  isError: boolean
  isLoading: boolean
  isLastPage: boolean
  isLoadMore: boolean
  data: {
    listPost: ListPostData[]
  }
}

const initState: ListPostSlice = {
  isError: false,
  isLoading: false,
  isLastPage: false,
  isLoadMore: false,
  data: {
    listPost: [],
  },
}

export const getDataListPost = createAsyncThunk(
  'ListPostSlice',
  async (payload: { page: number; limit?: number }) => {
    const res = await ListPostApi.getListPost(payload)
    return res
  }
)
const listPostSlice = createSlice({
  name: 'ListPostSlice',
  initialState: initState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getDataListPost.pending, (state, action) => {
      const page = action.meta.arg.page
      state.isLoading = page === DEFAULT_PARAMS.PAGE
      state.isError = false
      state.isLoadMore = page ? page > 1 : false
      state.isLastPage = false
    })
    builder.addCase(getDataListPost.fulfilled, (state, action) => {
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
          data: state.data.listPost.concat(arrayCurrent.listPost),
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
    builder.addCase(getDataListPost.rejected, state => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const {} = listPostSlice.actions
export default listPostSlice.reducer
