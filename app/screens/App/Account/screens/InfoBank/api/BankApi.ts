import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getListBank: (payload: { search?: string }) =>
    ApiClient.get(`/api/v1/default/list-bank`, { params: payload }),
}
