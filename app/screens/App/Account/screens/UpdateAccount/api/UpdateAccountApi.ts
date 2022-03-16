import { ApiClient } from '@app/service/Network/ApiService'

export const updateAccount = (payload: any) => ApiClient.put('', payload)
