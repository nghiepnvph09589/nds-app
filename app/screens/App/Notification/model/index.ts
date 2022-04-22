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
  create_at: string
  title: string
  content: string
}

export interface Body {
  page: number
  limit: number
}
export interface Payload {
  loadOnTop: boolean
  body: Body
}
