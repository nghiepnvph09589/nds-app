import { ApiClient } from '@app/service/Network/ApiService'

export const updateAccount = (payload: any) =>
  ApiClient.put(`/api/v1/app/customer/update`, payload)
