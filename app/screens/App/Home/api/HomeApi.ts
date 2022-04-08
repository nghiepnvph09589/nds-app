import { ApiClient } from '@app/service/Network/ApiService'
import { HomePayload } from '@app/service/Network/model/ApiPayload'
export default {
  getHome: (payload: HomePayload) =>
    ApiClient.get(`/api/v1/app/home`, { params: payload }),
  getListBanner: () => ApiClient.get(`/api/v1/app/banner/list`, {}),
}
