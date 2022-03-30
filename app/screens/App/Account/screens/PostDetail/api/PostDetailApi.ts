import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getPostDetail: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/app/post/request/${payload.id}`, {}),
  approvePost: (payload: { id: number }) =>
    ApiClient.put(
      `/api/v1/app/post/status-change-post-donate/${payload.id}`,
      {}
    ),
}
