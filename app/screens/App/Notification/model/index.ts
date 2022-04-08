export interface NotifySlice {
  isLoading: boolean
  error: boolean
  isLoadMore: boolean
  isLastPage: boolean
  data: Item[]
  countNotification: number
}
export interface Item {
  id: number
  status: number
  type: number
  NotificationPushes: any[]
  notification_id: number
}

export interface Body {
  page: number
  limit: number
}
export interface Payload {
  loadOnTop: boolean
  body: Body
}
