import { ApiClient } from '@app/service/Network/ApiService'
import { CreateSupport } from '../model'

export const getListFormSupport = (payload: any) =>
  ApiClient.get(`/api/v1/web/categories/list`, { params: payload })
export const createSupport = (payload: CreateSupport) =>
  ApiClient.post(`/api/v1/app/donate/create-app`, payload)
