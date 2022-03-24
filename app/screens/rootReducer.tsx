import SwitchNavigatorSlice from '@app/navigation/switchNavigatorSlice'
import ListPostSlice from './App/Account/screens/ListPost/slice/ListPostSlice'
import AccountSlice from './App/Account/slices/AccountSlice'
import HomeSlice from './App/Home/slice/HomeSlice'
import CreatePostSlice from './CreatePost/slice/CreatePostSlice'
import LocationSlice from './LocationSlice'
const rootReducer = {
  switchNavigatorReducer: SwitchNavigatorSlice,
  accountReducer: AccountSlice,
  homeReducer: HomeSlice,
  locationReducer: LocationSlice,
  creatPostReducer: CreatePostSlice,
  listPostReducer: ListPostSlice,
}

export default rootReducer
