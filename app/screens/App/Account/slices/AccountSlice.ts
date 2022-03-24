import { ROLE } from '@app/constant/Constant'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AccountApi from '../api/AccountApi'
import { AccountSlice } from '../model'

const initState: AccountSlice = {
  isError: false,
  isLoading: false,
  data: {
    id: 0,
    user_name: '',
    name: '',
    phone: '',
    email: '',
    status: 1,
    profile_picture_path: '',
    profile_picture_url: '',
    role: ROLE.CUSTOMER,
  },
}

export const getDataUserInfo = createAsyncThunk('AccountSlice', async () => {
  const res = await AccountApi.getUserInfo()
  return res
})

const accountSlice = createSlice({
  name: 'AccountSlice',
  initialState: initState,
  reducers: {
    logout: state => {
      state.data = {
        id: 0,
        user_name: '',
        name: '',
        phone: '',
        email: '',
        status: 1,
        profile_picture_path: '',
        profile_picture_url: '',
        role: ROLE.CUSTOMER,
      }
    },
  },

  extraReducers: builder => {
    builder.addCase(getDataUserInfo.pending, state => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(getDataUserInfo.fulfilled, (state, action) => {
      state.data = action.payload?.data
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getDataUserInfo.rejected, state => {
      state.isError = true
      state.isLoading = false
    })
  },
})

export const { logout } = accountSlice.actions
export default accountSlice.reducer
