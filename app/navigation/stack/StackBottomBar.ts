import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import AccountScreen from '@app/screens/App/Account/AccountScreen'
import CartScreen from '@app/screens/App/Cart/CartScreen'
import HomeScreen from '@app/screens/App/Home/HomeScreen'
import ProductScreen from '@app/screens/App/Product/ProductScreen'
const { HOME, PRODUCT, CART, USER } = SCREEN_ROUTER_APP

export default {
  [HOME]: HomeScreen,
  [PRODUCT]: ProductScreen,
  [CART]: CartScreen,
  [USER]: AccountScreen,
}
