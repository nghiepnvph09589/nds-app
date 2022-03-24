import { ApiClient } from '@app/service/Network/ApiService'
import { ChangePassword } from '../model'

export const changePassword = (payload: ChangePassword) =>
  ApiClient.put(`/api/v1/web/users/change-password`, payload)
