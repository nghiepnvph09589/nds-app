import { ApiClient } from '@app/service/Network/ApiService'
import _ from 'lodash'
import { UpdatePostSlice } from '../model'
export default {
  uploadMultiFile: (payload: {}) =>
    ApiClient.post(`/api/v1/file/upload-multiple`, payload),
  updatePost: (payload: UpdatePostSlice) =>
    ApiClient.put(
      `/api/v1/app/post/update/${payload.id}`,
      _.omit(payload, ['id', 'province_name', 'district_name', 'ward_name'])
    ),
}
