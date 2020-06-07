import moment from 'moment'

const MS_IN_A_SEC = 1000
const SEC_IN_A_MIN = 60
const MS_IN_A_MIN = SEC_IN_A_MIN * MS_IN_A_SEC

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

export const msToSeconds = (ms) => {
  return ms ? ms / MS_IN_A_SEC : 0
}

export const secondsToMs = (seconds) => {
  return seconds ? seconds * MS_IN_A_SEC : 0
}

export const getFormattedDuration = (durationInSec) => {
  if (!durationInSec) return 'None'
  if (durationInSec === 0) return 'None'

  const hh = Math.floor(durationInSec / MS_IN_A_MIN).toString(),
    mm = Math.floor((durationInSec % MS_IN_A_MIN) / SEC_IN_A_MIN).toString(),
    ss = Math.floor(durationInSec % SEC_IN_A_MIN).toString()

  // If less than 1 min, return seconds only
  if (durationInSec < SEC_IN_A_MIN) return `${ss}s`

  // If duration is an exact minutes value, return just minutes
  if (durationInSec % SEC_IN_A_MIN === 0) return `${mm} min`

  // Format duration as HH:MM:SS otherwise
  return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`
}

export const TIME_OPTS = [
  { label: 'None', valueInSeconds: 0 },
  { label: '00:15s', valueInSeconds: 15 },
  { label: '00:30s', valueInSeconds: 30 },
  { label: '00:45s', valueInSeconds: 45 },
  { label: '1 min', valueInSeconds: 60 },
  { label: '01:15 min', valueInSeconds: 75 },
  { label: '01:30 min', valueInSeconds: 90 },
  { label: '01:45 min', valueInSeconds: 105 },
  { label: '2 min', valueInSeconds: 120 },
  { label: '02:15 min', valueInSeconds: 135 },
  { label: '02:30 min', valueInSeconds: 150 },
  { label: '02:45 min', valueInSeconds: 165 },
  { label: '3 min', valueInSeconds: 180 },
  { label: '03:15 min', valueInSeconds: 195 },
  { label: '03:30 min', valueInSeconds: 210 },
  { label: '03:45 min', valueInSeconds: 225 },
  { label: '4 min', valueInSeconds: 240 },
  { label: '04:15 min', valueInSeconds: 255 },
  { label: '04:30 min', valueInSeconds: 270 },
  { label: '04:45 min', valueInSeconds: 285 },
  { label: '5 min', valueInSeconds: 300 },
  { label: '6 min', valueInSeconds: 360 },
  { label: '7 min', valueInSeconds: 420 },
  { label: '8 min', valueInSeconds: 480 },
  { label: '9 min', valueInSeconds: 540 },
  { label: '10 min', valueInSeconds: 600 },
]
