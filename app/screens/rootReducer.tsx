import SwitchNavigatorSlice from '@app/navigation/switchNavigatorSlice'
import AccountSlice from './App/Account/slices/AccountSlice'
import CreatePostSlice from './App/CreatePost/slice/CreatePostSlice'
import HomeSlice from './App/Home/slice/HomeSlice'
import LocationSlice from './LocationSlice'
const rootReducer = {
  switchNavigatorReducer: SwitchNavigatorSlice,
  accountReducer: AccountSlice,
  homeReducer: HomeSlice,
  locationReducer: LocationSlice,
  creatPostReducer: CreatePostSlice,
}

export default rootReducer
