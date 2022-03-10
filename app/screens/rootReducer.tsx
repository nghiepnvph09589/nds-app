import SwitchNavigatorSlice from '@app/navigation/switchNavigatorSlice'
import AccountSlice from './App/Account/slices/AccountSlice'
const rootReducer = {
  switchNavigatorReducer: SwitchNavigatorSlice,
  accountReducer: AccountSlice,
}

export default rootReducer
