import { ApiClient } from '@app/service/Network/ApiService'

export const requestUpdateSupportManage = (payload: any) =>
  ApiClient.put(
    `/api/v1/app/donate/update-image/${payload?.id}`,
    payload?.params
  )
