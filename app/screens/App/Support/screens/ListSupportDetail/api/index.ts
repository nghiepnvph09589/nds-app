import { ApiClient } from '@app/service/Network/ApiService'
import { getListSupport } from '../model'

export const getListSupportDetail = (payload: getListSupport) =>
  ApiClient.get(`/api/v1/app/post/post-donates/${payload?.id}`, {
    params: payload?.params,
  })
