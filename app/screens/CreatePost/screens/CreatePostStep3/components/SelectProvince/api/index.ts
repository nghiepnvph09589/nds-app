import { ApiClient } from '@app/service/Network/ApiService'

export const getListProvince = (payload: any) =>
  ApiClient.get(`/api/v1/default/list-province`, payload)
export const getListDistrict = (payload: any) =>
  ApiClient.get(`/api/v1/default/list-district`, { params: payload })
export const getListWard = (payload: any) =>
  ApiClient.get(`/api/v1/default/list-ward`, { params: payload })
