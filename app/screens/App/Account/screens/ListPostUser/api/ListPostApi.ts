import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getListPost: (payload: { page: number; limit?: number }) =>
    ApiClient.get(`/api/v1/app/home/list-post-donate`, {
      params: payload,
    }),
}
