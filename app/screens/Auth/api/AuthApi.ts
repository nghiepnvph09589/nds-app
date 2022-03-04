import { ApiClient } from '@app/service/Network/ApiService'
import {
  LoginPayload,
  RegisterPayload,
} from '@app/service/Network/model/ApiPayload'
export default {
  register: (payload: RegisterPayload) =>
    ApiClient.post(`/api/v1/register`, payload),
  login: (payload: LoginPayload) => ApiClient.post(`/api/v1/login`, payload),
}
