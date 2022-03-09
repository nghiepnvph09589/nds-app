import { ApiClient } from '@app/service/Network/ApiService'
import { ChangePassPayload } from '@app/service/Network/model/ApiPayload'
export default {
  changePass: (payload: ChangePassPayload) =>
    ApiClient.post(`/api/v1/app/customer/change-password`, payload),
}
