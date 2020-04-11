import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const TIME_ENTRY_TYPE = {
  EXERCISE: 'EXERCISE',
  EXERCISE_REST: 'EXERCISE_REST',
  ROUND_REST: 'ROUND_REST',
}

const initialState = {
  tick: null,
  workout: null,
  currExerciseIdx: null,
  timeEntries: [],
}

const startTimeEntry = (type = TIME_ENTRY_TYPE.EXERCISE, now = moment()) => ({
  type,
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
    start(state, { payload }) {
      state.tick = payload.now
      state.workout = payload.workout
      state.timeEntries = [startTimeEntry()]
    },

    play(state, { payload }) {
      const { timeEntries } = state
      const lastTimeEntry = timeEntries[timeEntries.length - 1]

      state.tick = payload
      state.timeEntries = [...timeEntries, startTimeEntry(lastTimeEntry.type)]
    },

    stop(state, { payload }) {
      let { timeEntries } = state
      const lastTimeEntry = timeEntries.pop()

      state.tick = payload
      state.timeEntries = [...timeEntries, stopTimeEntry(lastTimeEntry)]
    },

    tick(state, { payload }) {
      state.tick = payload
    },
  },
})

export default newSession.reducer

// ------------------------- Action creators -------------------------

export const start = (workout, now = moment()) => (dispatch) => {
  dispatch(newSession.actions.start({ workout, now: now.valueOf() }))
}

export const play = (now = moment()) => (dispatch) => {
  dispatch(newSession.actions.play(now.valueOf()))
}

export const stop = (now = moment()) => (dispatch) => {
  dispatch(newSession.actions.stop(now.valueOf()))
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

// Return session's next exercise (if any)
export const getNextExercise = ({ newSession }) => {
  const { currExerciseIdx, workout } = newSession
  const { exercises = [] } = workout
  if (!hasStarted({ newSession })) return exercises[0]

  if (currExerciseIdx === exercises.length - 1) {
    return exercises[0]
  } else {
    return exercises[currExerciseIdx + 1]
  }
}
