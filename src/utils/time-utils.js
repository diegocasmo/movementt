import moment from 'moment'

// Return today's date
export const now = () => {
  return moment()
}

// Return the number of milliseconds between 1 January 1970 00:00:00 UTC
// and the given date
export const timestamp = (dateOrMs = now()) => {
  return moment(dateOrMs).valueOf()
}

// Return the number of elapsed ms from `fromDate` until `toDate`
export const getTotalEllapsedMs = (fromDate, toDate) => {
  const duration = moment.duration(moment(fromDate) - moment(toDate))
  const elapsedMs = moment.duration(duration).asMilliseconds()
  return elapsedMs
}

// Return the duration of the specified time value
export const getDuration = (value) => {
  const duration = moment.duration(value, 'milliseconds')
  const hours = moment.duration(duration).hours()
  const minutes = moment.duration(duration).minutes()
  const seconds = moment.duration(duration).seconds()
  return { hours, minutes, seconds }
}
