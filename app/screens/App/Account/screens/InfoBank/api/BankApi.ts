import { ApiClient } from '@app/service/Network/ApiService'
import _ from 'lodash'
export default {
  getListBank: (payload: { search?: string }) =>
    ApiClient.get(`/api/v1/default/list-bank`, { params: payload }),
  createBank: (payload: {
    donate_request_id: number
    bank_id: number
    bank_name: string
    branch_name: string
    account_name: string
    account_number: string
    type: number
  }) => ApiClient.post(`/api/v1/app/post/create-bank`, payload),
  updateBank: (payload: {
    id: number
    bank_id: number
    bank_name: string
    branch_name: string
    account_name: string
    account_number: string
    type: number
  }) =>
    ApiClient.put(
      `/api/v1/app/post/update-bank${payload.id}`,
      _.omit(payload, ['id'])
    ),
  getDetailBank: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/app/post/detail-bank${payload.id}`, {
      params: payload,
    }),
}
