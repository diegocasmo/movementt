import moment from 'moment'

export const MS_IN_A_SEC = 1000
export const SEC_IN_A_MIN = 60
export const MS_IN_A_MIN = SEC_IN_A_MIN * MS_IN_A_SEC

// Return today's date
export const now = () => {
  return moment()
}

// Return the number of milliseconds between 1 January 1970 00:00:00 UTC
// and the given date
export const timestamp = (dateOrMs = now()) => {
  return moment(dateOrMs).valueOf()
}

export const fromNow = (dateOrMs = now(), to = now()) => {
  return moment(dateOrMs).from(moment(to))
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

export const msToSeconds = (ms) => {
  return ms ? ms / MS_IN_A_SEC : 0
}

export const secondsToMs = (seconds) => {
  return seconds ? seconds * MS_IN_A_SEC : 0
}

export const TIME_OPTS = [
  { label: 'None', valueInMs: 0 },
  { label: '15 s', valueInMs: 15 * MS_IN_A_SEC },
  { label: '30 s', valueInMs: 30 * MS_IN_A_SEC },
  { label: '45 s', valueInMs: 45 * MS_IN_A_SEC },
  { label: '1 min', valueInMs: 60 * MS_IN_A_SEC },
  { label: '1:15 min', valueInMs: 75 * MS_IN_A_SEC },
  { label: '1:30 min', valueInMs: 90 * MS_IN_A_SEC },
  { label: '1:45 min', valueInMs: 105 * MS_IN_A_SEC },
  { label: '2 min', valueInMs: 120 * MS_IN_A_SEC },
  { label: '2:15 min', valueInMs: 135 * MS_IN_A_SEC },
  { label: '2:30 min', valueInMs: 150 * MS_IN_A_SEC },
  { label: '2:45 min', valueInMs: 165 * MS_IN_A_SEC },
  { label: '3 min', valueInMs: 180 * MS_IN_A_SEC },
  { label: '3:15 min', valueInMs: 195 * MS_IN_A_SEC },
  { label: '3:30 min', valueInMs: 210 * MS_IN_A_SEC },
  { label: '3:45 min', valueInMs: 225 * MS_IN_A_SEC },
  { label: '4 min', valueInMs: 240 * MS_IN_A_SEC },
  { label: '4:15 min', valueInMs: 255 * MS_IN_A_SEC },
  { label: '4:30 min', valueInMs: 270 * MS_IN_A_SEC },
  { label: '4:45 min', valueInMs: 285 * MS_IN_A_SEC },
  { label: '5 min', valueInMs: 300 * MS_IN_A_SEC },
  { label: '6 min', valueInMs: 360 * MS_IN_A_SEC },
  { label: '7 min', valueInMs: 420 * MS_IN_A_SEC },
  { label: '8 min', valueInMs: 480 * MS_IN_A_SEC },
  { label: '9 min', valueInMs: 540 * MS_IN_A_SEC },
  { label: '10 min', valueInMs: 600 * MS_IN_A_SEC },
]
