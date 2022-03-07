import { ApiClient } from '@app/service/Network/ApiService'
export default {
  uploadFile: (payload: {}) =>
    ApiClient.post(`/api/v1/file/upload-single/1`, payload),
}
