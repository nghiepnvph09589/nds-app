import { ApiClient } from '@app/service/Network/ApiService'

export const getBannerDetail = (payload: any) =>
  ApiClient.get(`/api/v1/web/banner/${payload?.id}`, payload)
