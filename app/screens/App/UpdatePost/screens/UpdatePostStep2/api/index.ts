import { ApiClient } from '@app/service/Network/ApiService'

export const getListTypeGroup = (payload: any) =>
  ApiClient.get(`/api/v1/app/droplist/droplist-group`, { params: payload })
export const getListSubject = (payload: any) =>
  ApiClient.get(`/api/v1/app/droplist/droplist-category`, { params: payload })
