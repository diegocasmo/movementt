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
  { label: 'None', valueInSeconds: 0 },
  { label: '15 s', valueInSeconds: 15 },
  { label: '30 s', valueInSeconds: 30 },
  { label: '45 s', valueInSeconds: 45 },
  { label: '1 min', valueInSeconds: 60 },
  { label: '1:15 min', valueInSeconds: 75 },
  { label: '1:30 min', valueInSeconds: 90 },
  { label: '1:45 min', valueInSeconds: 105 },
  { label: '2 min', valueInSeconds: 120 },
  { label: '2:15 min', valueInSeconds: 135 },
  { label: '2:30 min', valueInSeconds: 150 },
  { label: '2:45 min', valueInSeconds: 165 },
  { label: '3 min', valueInSeconds: 180 },
  { label: '3:15 min', valueInSeconds: 195 },
  { label: '3:30 min', valueInSeconds: 210 },
  { label: '3:45 min', valueInSeconds: 225 },
  { label: '4 min', valueInSeconds: 240 },
  { label: '4:15 min', valueInSeconds: 255 },
  { label: '4:30 min', valueInSeconds: 270 },
  { label: '4:45 min', valueInSeconds: 285 },
  { label: '5 min', valueInSeconds: 300 },
  { label: '6 min', valueInSeconds: 360 },
  { label: '7 min', valueInSeconds: 420 },
  { label: '8 min', valueInSeconds: 480 },
  { label: '9 min', valueInSeconds: 540 },
  { label: '10 min', valueInSeconds: 600 },
]
