import { ApiClient } from '@app/service/Network/ApiService'
interface getNotify {
  limit: number
  page: number
}
interface readAllNotify {}
interface CountNotify {}
interface readNotify {
  id: number
}
export const getListNotification = (payload?: getNotify) =>
  ApiClient.get(`/api/v1/notification/list`, { params: payload })
export const requestCountNotification = () =>
  ApiClient.get(`/api/v1/notification/not-seen`, {})
export const requestReadAllNotification = (payload: readAllNotify) =>
  ApiClient.get(`/api/v1/notification/changs-status-list`, payload)
export const requestReadNotification = (payload: readNotify) =>
  ApiClient.get(`/api/v1/notification/changs-status/${payload?.id}`, payload)
