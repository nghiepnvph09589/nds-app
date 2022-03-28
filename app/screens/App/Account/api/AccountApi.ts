import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getUserInfo: () => ApiClient.get(`/api/v1/app/customer/info`, { params: {} }),
}
export const requestLogout = () =>
  ApiClient.get(`/api/v1/app/customer/info`, {})
