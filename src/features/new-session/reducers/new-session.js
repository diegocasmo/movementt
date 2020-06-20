import { createSlice } from '@reduxjs/toolkit'
import { now, timestamp, getTotalEllapsedMs } from '_utils/time-utils'

export const TIME_ENTRY_TYPE = {
  EXERCISE: 'EXERCISE',
  EXERCISE_REST: 'EXERCISE_REST',
  ROUND_REST: 'ROUND_REST',
}

const initialState = {
  tick: null,
  hasSound: true,
  currExerciseIdx: null,
  roundsCompleted: 0,
  workout: null,
  timeEntries: [],
}

const startTimeEntry = (type = TIME_ENTRY_TYPE.EXERCISE) => ({
  type,
  startedAt: timestamp(now()),
  elapsedMs: null,
})

const stopTimeEntry = (timeEntry) => {
  return {
    ...timeEntry,
    elapsedMs: getTotalEllapsedMs(now(), timeEntry.startedAt),
  }
}

const isTimeEntryRunning = ({ elapsedMs }) => elapsedMs === null
const isTimeEntryStopped = (timeEntry) => !isTimeEntryRunning(timeEntry)

const getTimeEntriesElapsedMs = (timeEntries) => {
  return timeEntries.reduce(
    (acc, timeEntry) =>
      timeEntry.elapsedMs === null
        ? acc + getTotalEllapsedMs(now(), timeEntry.startedAt)
        : acc + timeEntry.elapsedMs,
    0
  )
}

const newSession = createSlice({
  name: 'newSession',
  initialState,
  reducers: {
    init(state, { payload }) {
      state.workout = payload
    },

    reset: (state) => {
      state.tick = initialState.tick
      state.hasSound = initialState.hasSound
      state.currExerciseIdx = initialState.currExerciseIdx
      state.roundsCompleted = initialState.roundsCompleted
      state.workout = initialState.workout
      state.timeEntries = initialState.timeEntries
    },

    start(state, { payload }) {
      state.tick = payload
      state.currExerciseIdx = 0
      state.timeEntries = [startTimeEntry()]
    },

    play(state) {
      const { timeEntries } = state
      const lastTimeEntry = timeEntries[timeEntries.length - 1]
      if (isTimeEntryStopped(lastTimeEntry)) {
        state.timeEntries = [...timeEntries, startTimeEntry(lastTimeEntry.type)]
      }
    },

    stop(state) {
      let { timeEntries } = state
      if (isTimeEntryRunning(timeEntries[timeEntries.length - 1])) {
        const lastTimeEntry = timeEntries.pop()
        state.timeEntries = [...timeEntries, stopTimeEntry(lastTimeEntry)]
      }
    },

    tick(state, { payload }) {
      state.tick = payload
    },

    completeExercise(state) {
      let { currExerciseIdx, roundsCompleted, workout, timeEntries } = state

      const lastTimeEntry = timeEntries.pop()
      const currExercise = workout.exercises[currExerciseIdx]
      const isLastExercise = currExerciseIdx === workout.exercises.length - 1
      const isLastRound = roundsCompleted === workout.rounds - 1

      if (isLastExercise && isLastRound) {
        state.currExerciseIdx = null
        state.roundsCompleted += 1
        state.timeEntries = [...timeEntries, stopTimeEntry(lastTimeEntry)]
      } else if (isLastExercise) {
        const nextTimeEntryType =
          workout.restSeconds === 0
            ? TIME_ENTRY_TYPE.EXERCISE
            : TIME_ENTRY_TYPE.ROUND_REST

        state.currExerciseIdx = 0
        state.roundsCompleted += 1
        state.timeEntries = [
          ...timeEntries,
          stopTimeEntry(lastTimeEntry),
          startTimeEntry(nextTimeEntryType),
        ]
      } else {
        const nextTimeEntryType =
          currExercise.restSeconds === 0
            ? TIME_ENTRY_TYPE.EXERCISE
            : TIME_ENTRY_TYPE.EXERCISE_REST

        state.currExerciseIdx += 1
        state.timeEntries = [
          ...timeEntries,
          stopTimeEntry(lastTimeEntry),
          startTimeEntry(nextTimeEntryType),
        ]
      }
    },

    completeExerciseRest(state) {
      let { timeEntries } = state
      const lastTimeEntry = timeEntries.pop()

      state.timeEntries = [
        ...timeEntries,
        stopTimeEntry(lastTimeEntry),
        startTimeEntry(TIME_ENTRY_TYPE.EXERCISE),
      ]
    },

    completeRoundRest(state) {
      let { timeEntries } = state
      const lastTimeEntry = timeEntries.pop()

      state.timeEntries = [
        ...timeEntries,
        stopTimeEntry(lastTimeEntry),
        startTimeEntry(TIME_ENTRY_TYPE.EXERCISE),
      ]
    },

    toggleSound(state) {
      state.hasSound = !state.hasSound
    },
  },
})

export default newSession.reducer

// ------------------------- Action creators -------------------------

export const init = (workout) => (dispatch) => {
  dispatch(newSession.actions.init(workout))
}

export const reset = () => (dispatch) => {
  dispatch(newSession.actions.reset())
}

export const start = () => (dispatch) => {
  dispatch(newSession.actions.start(timestamp(now())))
}

export const play = () => (dispatch) => {
  dispatch(newSession.actions.play())
}

export const stop = () => (dispatch) => {
  dispatch(newSession.actions.stop())
}

export const tick = () => (dispatch) => {
  dispatch(newSession.actions.tick(timestamp(now())))
}

export const completeExercise = () => (dispatch) => {
  dispatch(newSession.actions.completeExercise())
}

export const completeExerciseRest = () => (dispatch) => {
  dispatch(newSession.actions.completeExerciseRest())
}

export const completeRoundRest = () => (dispatch) => {
  dispatch(newSession.actions.completeRoundRest())
}

export const toggleSound = () => (dispatch) => {
  dispatch(newSession.actions.toggleSound())
}

// ---------------------------- Selectors ----------------------------

// Return true if new session has started, false otherwise
export const hasStarted = (state) => {
  return state.newSession.tick !== null
}

// Return true if new session has sound, false otherwise
export const hasSound = (state) => {
  return state.newSession.hasSound
}

// Return true if session is running, false otherwise
export const isRunning = (state) => {
  return isTimeEntryRunning(getCurrTimeEntry(state))
}

// Return true if session is stopped, false otherwise
export const isStopped = (state) => {
  return !isRunning(state)
}

// Return true if session is completed, false otherwise
export const isCompleted = ({ newSession }) => {
  const currTimeEntry = getCurrTimeEntry({ newSession })
  return (
    newSession.currExerciseIdx === null &&
    currTimeEntry &&
    isTimeEntryStopped(currTimeEntry)
  )
}

// Returns time entry which is currently running
export const getCurrTimeEntry = ({ newSession }) => {
  const { timeEntries = [] } = newSession

  return timeEntries[timeEntries.length - 1]
}

// Return the total elapsed time in ms of the current time entry (including)
// time it has been stopped for
export const getCurrTimeEntryElapsedMs = ({ newSession }) => {
  let timeEntries = [...newSession.timeEntries]
  if (timeEntries.length === 0) return 0

  const currTimeEntry = timeEntries.pop()
  const prevTimeEntries = [currTimeEntry]

  let timeEntry = timeEntries.pop()
  while (timeEntry && timeEntry.type === currTimeEntry.type) {
    prevTimeEntries.push(timeEntry)
    timeEntry = timeEntries.pop()
  }
  return getTimeEntriesElapsedMs(prevTimeEntries)
}

// Return the number of milliseconds the session has been running for
export const getTotalElapsedMs = (state) => {
  return getTimeEntriesElapsedMs(state.newSession.timeEntries)
}

export const getPrevExercise = ({ newSession }) => {
  const {
    currExerciseIdx,
    workout: { exercises },
  } = newSession
  if (currExerciseIdx === 0) {
    return exercises[exercises.length - 1]
  } else {
    return exercises[currExerciseIdx - 1]
  }
}

export const getCurrExercise = ({ newSession }) => {
  const {
    currExerciseIdx,
    workout: { exercises },
  } = newSession
  return exercises[currExerciseIdx]
}

export const getWorkout = (state) => {
  return state.newSession.workout
}

export const getCurrRound = ({ newSession }) => {
  return Math.min.apply(Math, [
    newSession.roundsCompleted + 1,
    newSession.workout.rounds,
  ])
}
