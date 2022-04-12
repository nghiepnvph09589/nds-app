import { ApiClient } from '@app/service/Network/ApiService'

export const getListSupported = (payload: any) =>
  ApiClient.get(`/api/v1/app/donate/user-donates`, {
    params: payload,
  })
