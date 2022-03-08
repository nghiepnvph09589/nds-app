import { ApiClient } from '@app/service/Network/ApiService'
import { RegisterPayload } from '@app/service/Network/model/ApiPayload'
export default {
  uploadFile: (payload: {}, type: number) =>
    ApiClient.post(`/api/v1/file/upload-single/${type}`, payload),
  register: (payload: RegisterPayload) =>
    ApiClient.post(`api/v1/app/customer/register`, payload),
}
