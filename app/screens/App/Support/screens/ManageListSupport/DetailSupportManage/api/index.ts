import { ApiClient } from '@app/service/Network/ApiService'

export const getDetailSupportManage = (payload: { id: number }) =>
  ApiClient.get(`/api/v1/app/donate/${payload?.id}`, payload)
export const ChangeStatusSupport = (payload: any) =>
  ApiClient.put(
    `/api/v1/app/donate/change-donate-status/${payload?.id}`,
    payload?.params
  )
