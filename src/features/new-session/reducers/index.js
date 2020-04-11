import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const initialState = {
  tick: null,
  timeEntries: [],
}

const startTimeEntry = (now = moment()) => ({
  startedAt: now.valueOf(),
  elapsedMs: null,
})

const stopTimeEntry = (timeEntry, now = moment()) => {
  const duration = moment.duration(now - moment(timeEntry.startedAt))
  return {
    ...timeEntry,
    elapsedMs: moment.duration(duration).asMilliseconds(),
  }
}

const isTimeEntryRunning = ({ elapsedMs }) => elapsedMs === null

const newSession = createSlice({
  name: 'newSession',
  initialState,
  reducers: {
    start(state) {
      const { timeEntries } = state
      state.timeEntries = [...timeEntries, startTimeEntry()]
    },

    stop(state) {
      let { timeEntries } = state
      const lastTimeEntry = timeEntries.pop()
      state.timeEntries = [...timeEntries, stopTimeEntry(lastTimeEntry)]
    },

    tick(state, { payload }) {
      state.tick = payload
    },
  },
})

export default newSession.reducer

// ------------------------- Action creators -------------------------

export const start = () => (dispatch) => {
  dispatch(newSession.actions.start())
}

export const stop = () => (dispatch) => {
  dispatch(newSession.actions.stop())
}

export const tick = (now = moment()) => (dispatch) => {
  dispatch(newSession.actions.tick(now.valueOf()))
}

// ---------------------------- Selectors ----------------------------

// Return true if new session has started, false otherwise
export const hasStarted = ({ newSession }) => {
  return newSession.tick !== null
}

// Returns time entry which is currently running
export const getLastTimeEntry = ({ newSession }) => {
  const { timeEntries } = newSession

  return timeEntries[timeEntries.length - 1]
}

// Return true if session is stopped, false otherwise
export const isRunning = ({ newSession }) => {
  const { timeEntries } = newSession
  const timeEntry = getLastTimeEntry({ newSession })
  return timeEntries.length > 0 && isTimeEntryRunning(timeEntry)
}

// Return the number of milliseconds the session has been running for
export const getElapsedMs = ({ newSession }, now = moment()) => {
  const { timeEntries } = newSession

  // Add stopped ms of all time entries
  const stoppedMs = timeEntries.reduce((acc, { elapsedMs }) => {
    return elapsedMs === null ? acc : acc + elapsedMs
  }, 0)

  // Add currently active time entry ms (if any)
  let runningMs = 0
  const timeEntry = getLastTimeEntry({ newSession })
  if (timeEntry && isTimeEntryRunning(timeEntry)) {
    const duration = moment.duration(now - moment(timeEntry.startedAt))
    runningMs = moment.duration(duration).asMilliseconds()
  }

  return stoppedMs + runningMs
}
