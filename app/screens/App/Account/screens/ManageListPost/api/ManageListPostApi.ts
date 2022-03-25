import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getListManagerPost: (payload: {
    page?: number
    status?: number
    limit?: number
  }) => ApiClient.get(`/api/v1/app/post/list`, { params: payload }),
}
