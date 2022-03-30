import { ApiClient } from '@app/service/Network/ApiService'
import { EditSupport } from '../model'

export const getListFormSupport = (payload: any) =>
  ApiClient.get(`/api/v1/web/categories/list`, { params: payload })

export const editSupportManage = (payload: EditSupport) =>
  ApiClient.put(`/api/v1/app/donate/update/${payload?.id}`, payload.params)
