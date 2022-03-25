import { ApiClient } from '@app/service/Network/ApiService'

export const getDetailSupportManage = (payload: { id: number }) =>
  ApiClient.get(`/api/v1/app/donate/${payload?.id}`, payload)
