import { ApiClient } from '@app/service/Network/ApiService'
import { PayloadGetListSupport } from '../model'

export const getListSupportManage = (payload: PayloadGetListSupport) =>
  ApiClient.get(`/api/v1/app/donate/list`, { params: payload })
