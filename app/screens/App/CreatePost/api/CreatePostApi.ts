import { ApiClient } from '@app/service/Network/ApiService'
import { CreatePostSlice } from '../model'
export default {
  uploadMultiFile: (payload: {}) =>
    ApiClient.post(`/api/v1/file/upload-multiple`, payload),
  createPost: (payload: CreatePostSlice) =>
    ApiClient.post(`/api/v1/app/donate/create`, payload),
}
