import { ApiClient } from '@app/service/Network/ApiService'
import {
  CheckAccountPayload,
  LoginPayload,
} from '@app/service/Network/model/ApiPayload'
export default {
  checkAccount: (payload: CheckAccountPayload) =>
    ApiClient.post(`/api/v1/authen/check-account`, payload),
  login: (payload: LoginPayload) =>
    ApiClient.put(`/api/v1/authen/login_app`, payload),
}
