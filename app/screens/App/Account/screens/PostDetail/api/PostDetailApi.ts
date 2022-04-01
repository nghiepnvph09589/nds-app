import { ApiClient } from '@app/service/Network/ApiService'
import _ from 'lodash'
export default {
  getPostDetail: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/app/post/request/${payload.id}`, {}),
  approvePost: (payload: { id: number; reason: string }) =>
    ApiClient.put(
      `/api/v1/app/post/status-change-post-donate/${payload.id}`,
      _.omit(payload, ['id'])
    ),
  requestUpdatePost: (payload: { id: number; reason_request: string }) =>
    ApiClient.put(
      `/api/v1/app/post/request-update-post/${payload.id}`,
      _.omit(payload, ['id'])
    ),
  inactivePost: (payload: { id: number }) =>
    ApiClient.put(
      `/api/v1/app/post/stop-working/${payload.id}`,
      _.omit(payload, ['id'])
    ),
}
