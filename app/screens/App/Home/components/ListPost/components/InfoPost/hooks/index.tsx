import moment from 'moment'
const useTime = (time: Date) => {
  const timeSecond = moment().diff(moment(time), 'seconds')
  const timeMinutes = moment().diff(moment(time), 'minutes')
  const timeHours = moment().diff(moment(time), 'hours')
  const timeDay = moment().diff(moment(time), 'days')
  const timeMonth = moment().diff(moment(time), 'months')
  const timeYears = moment().diff(moment(time), 'years')

  if (timeSecond < 60) {
    return 'Vài giây trước'
  } else if (timeSecond >= 60 && timeMinutes < 60) {
    return `${timeMinutes} phút trước`
  } else if (timeMinutes >= 60 && timeHours < 24) {
    return `${timeHours} giờ trước`
  } else if (timeHours >= 24 && timeDay < 30) {
    return `${timeDay} ngày trước`
  } else if (timeDay >= 31 && timeMonth < 12) {
    return `${timeMonth} tháng trước`
  } else if (timeMonth >= 12) {
    return `${timeYears} năm trước`
  }

  return `${timeYears} năm trước`
}

export default useTime
