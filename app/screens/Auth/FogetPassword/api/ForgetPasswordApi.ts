import { ApiClient } from '@app/service/Network/ApiService'
import {
  ForgetPassPayload,
  ValidatePassPayload,
} from '@app/service/Network/model/ApiPayload'
export default {
  forgetPass: (payload: ForgetPassPayload) =>
    ApiClient.put(`/api/v1/web/users/forgot-password`, payload),
  validatePass: (payload: ValidatePassPayload) =>
    ApiClient.post(`/api/v1/app/customer/validate-password`, payload),
}
