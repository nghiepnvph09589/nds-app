import AccountSlice from './App/Account/slices/AccountSlice'
import CreatePostSlice from './App/CreatePost/slice/CreatePostSlice'
import HomeSlice from './App/Home/slice/HomeSlice'
import ListPostSlice from './App/Account/screens/ListPostUser/slice/ListPostSlice'
import LocationSlice from './LocationSlice'
import ManageListPostSlice from './App/Account/screens/ManageListPost/slice/ManageListPostSlice'
import NotificationSlice from './App/Notification/slice'
import SwitchNavigatorSlice from '@app/navigation/switchNavigatorSlice'
import UpdatePostSlice from './App/UpdatePost/slice/UpdatePostSlice'
const rootReducer = {
  switchNavigatorReducer: SwitchNavigatorSlice,
  accountReducer: AccountSlice,
  homeReducer: HomeSlice,
  locationReducer: LocationSlice,
  creatPostReducer: CreatePostSlice,
  updatePostReducer: UpdatePostSlice,
  listPostReducer: ListPostSlice,
  manageListPostReducer: ManageListPostSlice,
  NotificationReducer: NotificationSlice,
}

export default rootReducer
