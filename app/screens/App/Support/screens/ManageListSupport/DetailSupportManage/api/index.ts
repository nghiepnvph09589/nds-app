import { ApiClient } from '@app/service/Network/ApiService'

export const getDetailSupportManage = (payload: { id: number }) =>
  ApiClient.get(`/api/v1/app/donate/${payload?.id}`, payload)
export const ChangeStatusSupport = (payload: {
  id?: number
  params: {
    status?: number
    reason: string
  }
}) =>
  ApiClient.put(
    `/api/v1/app/donate/change-donate-status/${payload?.id}`,
    payload?.params
  )
export const requestEditSupport = (payload: {
  id?: number
  params: { reason_request: string }
}) =>
  ApiClient.put(
    `/api/v1/app/donate/request-update-donate/${payload?.id}`,
    payload?.params
  )
