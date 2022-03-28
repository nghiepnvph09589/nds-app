import SwitchNavigatorSlice from '@app/navigation/switchNavigatorSlice'
import ListPostSlice from './App/Account/screens/ListPostUser/slice/ListPostSlice'
import AccountSlice from './App/Account/slices/AccountSlice'
import HomeSlice from './App/Home/slice/HomeSlice'
import CreatePostSlice from './App/CreatePost/slice/CreatePostSlice'
import LocationSlice from './LocationSlice'
import ManageListPostSlice from './App/Account/screens/ManageListPost/slice/ManageListPostSlice'
const rootReducer = {
  switchNavigatorReducer: SwitchNavigatorSlice,
  accountReducer: AccountSlice,
  homeReducer: HomeSlice,
  locationReducer: LocationSlice,
  creatPostReducer: CreatePostSlice,
  listPostReducer: ListPostSlice,
  manageListPostReducer: ManageListPostSlice,
}

export default rootReducer
