import SwitchNavigatorSlice from '@app/navigation/switchNavigatorSlice'
import AccountSlice from './App/Account/slices/AccountSlice'
import HomeSlice from './App/Home/slice/HomeSlice'
import LocationSlice from './LocationSlice'
const rootReducer = {
  switchNavigatorReducer: SwitchNavigatorSlice,
  accountReducer: AccountSlice,
  homeReducer: HomeSlice,
  locationReducer: LocationSlice,
}

export default rootReducer
