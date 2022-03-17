import { ApiClient } from '@app/service/Network/ApiService'
export default {
  uploadMultiFile: (payload: {}) =>
    ApiClient.post(`/api/v1/file/upload-multiple`, payload),
}
