import { ApiClient } from '@app/service/Network/ApiService'
import { ListAddressPayload } from '@app/service/Network/model/ApiPayload'
export default {
  getListAddress: (payload: ListAddressPayload) =>
    ApiClient.get(`/api/v1/web/post/listAddress`, { params: payload }),
}
