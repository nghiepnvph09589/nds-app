import Account from '@app/screens/App/Account'
// import CartScreen from '@app/screens/App/Cart/CartScreen'
import Home from '@app/screens/App/Home'
import ProductScreen from '@app/screens/App/Product/ProductScreen'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
const { HOME, PRODUCT, USER } = SCREEN_ROUTER_APP

export default {
  [HOME]: Home,
  [PRODUCT]: ProductScreen,
  // [CART]: CartScreen,
  [USER]: Account,
}
