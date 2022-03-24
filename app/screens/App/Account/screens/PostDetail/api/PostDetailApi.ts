import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getPostDetail: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/app/donate/detail/${payload.id}`, {
      params: payload,
    }),
}
