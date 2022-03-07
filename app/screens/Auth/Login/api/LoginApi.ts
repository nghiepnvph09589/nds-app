import { ApiClient } from '@app/service/Network/ApiService'
import { CheckAccountPayload } from '@app/service/Network/model/ApiPayload'
export default {
  checkAccount: (payload: CheckAccountPayload) =>
    ApiClient.post(`/api/v1/authen/check-account`, payload),
}
