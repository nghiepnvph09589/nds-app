import { NotifySlice, Payload } from '../model'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getListNotification } from '../api'

let initialState: NotifySlice = {
  isLoading: false,
  error: false,
  isLoadMore: false,
  isLastPage: false,
  data: [],
  countNotification: 0,
}

export const requestListNotificationThunk = createAsyncThunk(
  'notification',
  async (payload: Payload) => {
    return await getListNotification(payload?.body)
  }
)

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // readNotification: (state, action) => {
    //   state.data[action.payload].is_read = 1
    // },
    // setCountNotify: (state, action) => {
    //   state.countNotification = action.payload
    // },
    // clearNotifyCount: state => {
    //   state.countNotification = 0
    // },
    readAllNotify: state => {
      state.data = state.data.map((item: any) => ({
        ...item,
        NotificationPushes: [{ id: item?.id }],
      }))
    },
    readNotificationForId: (state, action) => {
      // state.data[action.payload].is_read = 1
      state.data = state.data.map((item: any) => {
        if (item.id === action.payload) {
          return { ...item, NotificationPushes: [{ id: item?.id }] }
        } else {
          return { ...item }
        }
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(requestListNotificationThunk.pending, (state, action) => {
      if (!action.meta.arg.loadOnTop) {
        if (action.meta.arg.body.page === 1) {
          state.isLoading = true
        } else {
          state.isLoadMore = true
        }
      }
    })
    builder.addCase(requestListNotificationThunk.fulfilled, (state, action) => {
      state.error = false

      if (action.meta.arg.body.page === 1 || action.meta.arg.loadOnTop) {
        state.isLastPage = false
        state.isLoading = false
        state.data = action.payload.data
      } else {
        state.isLoadMore = false
        if (action.payload.data.length) {
          state.data = [...state.data, ...action.payload.data]
        } else {
          state.isLastPage = true
        }
      }
    })
    builder.addCase(requestListNotificationThunk.rejected, (state, action) => {
      state.error = true
      if (action.meta.arg.body.page === 1) {
        state.isLoading = false
      } else {
        state.isLoadMore = false
      }
    })
  },
})

export const {
  // readNotification,
  // setCountNotify,
  // clearNotifyCount,
  readAllNotify,
  readNotificationForId,
} = NotificationSlice.actions

export default NotificationSlice.reducer
