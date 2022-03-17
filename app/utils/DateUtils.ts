import moment from 'moment'

export const formatShortDate = (timestamp: any) =>
  moment(timestamp).utcOffset(7).format('DD/MM/YYYY')
