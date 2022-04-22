import { ApiClient } from '@app/service/Network/ApiService'
import { ListAddressPayload } from '@app/service/Network/model/ApiPayload'
export default {
  getListAddress: (payload: ListAddressPayload) =>
    ApiClient.get(`/api/v1/web/post/listAddress`, { params: payload }),
  getListProvince: (payload: any) =>
    ApiClient.get(`/api/v1/default/list-province`, payload),
  getListDistrict: (payload: any) =>
    ApiClient.get(`/api/v1/default/list-district`, { params: payload }),
  getListWard: (payload: any) =>
    ApiClient.get(`/api/v1/default/list-ward`, { params: payload }),
  getListCategory: (payload: any) =>
    ApiClient.get(`/api/v1/web/categories/list`, { params: payload }),
  getListGroup: (payload: any) =>
    ApiClient.get(`/api/v1/web/groups/list`, { params: payload }),
}
