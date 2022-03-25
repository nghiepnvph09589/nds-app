import { ApiClient } from '@app/service/Network/ApiService'

export const getListFormSupport = (payload: any) =>
  ApiClient.get(`/api/v1/web/categories/list`, { params: payload })
