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
  ApiClient.get(``, { params: payload })
export const requestCountNotification = (payload: CountNotify) =>
  ApiClient.get(``, payload)
export const requestReadAllNotification = (payload: readAllNotify) =>
  ApiClient.put(``, payload)
export const requestReadNotification = (payload: readNotify) =>
  ApiClient.path(``, payload)
