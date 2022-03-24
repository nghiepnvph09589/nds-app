import { ApiClient } from '@app/service/Network/ApiService'
import { UpdateAccount } from '../model'

export const updateAccount = (payload: UpdateAccount) =>
  ApiClient.put(`/api/v1/app/customer/update`, payload)
