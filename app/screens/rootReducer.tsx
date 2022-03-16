import SwitchNavigatorSlice from '@app/navigation/switchNavigatorSlice'
import AccountSlice from './App/Account/slices/AccountSlice'
import HomeSlice from './App/Home/slice/HomeSlice'
const rootReducer = {
  switchNavigatorReducer: SwitchNavigatorSlice,
  accountReducer: AccountSlice,
  homeReducer: HomeSlice,
}

export default rootReducer
