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
  routine: null,
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

const newWorkout = createSlice({
  name: 'newWorkout',
  initialState,
  reducers: {
    init(state, { payload }) {
      state.routine = payload
    },

    reset: (state) => {
      state.tick = initialState.tick
      state.hasSound = initialState.hasSound
      state.currExerciseIdx = initialState.currExerciseIdx
      state.roundsCompleted = initialState.roundsCompleted
      state.routine = initialState.routine
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
      let { currExerciseIdx, roundsCompleted, routine, timeEntries } = state

      const lastTimeEntry = timeEntries.pop()
      const currExercise = routine.exercises[currExerciseIdx]
      const isLastExercise = currExerciseIdx === routine.exercises.length - 1
      const isLastRound = roundsCompleted === routine.rounds - 1

      if (isLastExercise && isLastRound) {
        state.currExerciseIdx = null
        state.roundsCompleted += 1
        state.timeEntries = [...timeEntries, stopTimeEntry(lastTimeEntry)]
      } else if (isLastExercise) {
        const nextTimeEntryType =
          routine.restSeconds === 0
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

export default newWorkout.reducer

// ------------------------- Action creators -------------------------

export const init = (routine) => (dispatch) => {
  dispatch(newWorkout.actions.init(routine))
}

export const resetWorkout = () => (dispatch) => {
  dispatch(newWorkout.actions.reset())
}

export const start = () => (dispatch) => {
  dispatch(newWorkout.actions.start(timestamp(now())))
}

export const play = () => (dispatch) => {
  dispatch(newWorkout.actions.play())
}

export const stop = () => (dispatch) => {
  dispatch(newWorkout.actions.stop())
}

export const tick = () => (dispatch) => {
  dispatch(newWorkout.actions.tick(timestamp(now())))
}

export const completeExercise = () => (dispatch) => {
  dispatch(newWorkout.actions.completeExercise())
}

export const completeExerciseRest = () => (dispatch) => {
  dispatch(newWorkout.actions.completeExerciseRest())
}

export const completeRoundRest = () => (dispatch) => {
  dispatch(newWorkout.actions.completeRoundRest())
}

export const toggleSound = () => (dispatch) => {
  dispatch(newWorkout.actions.toggleSound())
}

// ---------------------------- Selectors ----------------------------

// Return true if new workout has started, false otherwise
export const hasStarted = (state) => {
  return state.newWorkout.tick !== null
}

// Return true if new workout has sound, false otherwise
export const hasSound = (state) => {
  return state.newWorkout.hasSound
}

// Return true if workout is running, false otherwise
export const isRunning = (state) => {
  return isTimeEntryRunning(getCurrTimeEntry(state))
}

// Return true if workout is stopped, false otherwise
export const isStopped = (state) => {
  return !isRunning(state)
}

// Return true if workout is completed, false otherwise
export const isCompleted = ({ newWorkout }) => {
  const currTimeEntry = getCurrTimeEntry({ newWorkout })
  return (
    newWorkout.currExerciseIdx === null &&
    currTimeEntry &&
    isTimeEntryStopped(currTimeEntry)
  )
}

// Returns time entry which is currently running
export const getCurrTimeEntry = ({ newWorkout }) => {
  const { timeEntries = [] } = newWorkout

  return timeEntries[timeEntries.length - 1]
}

// Return the total elapsed time in ms of the current time entry (including)
// time it has been stopped for
export const getCurrTimeEntryElapsedMs = ({ newWorkout }) => {
  let timeEntries = [...newWorkout.timeEntries]
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

// Return the number of milliseconds the workout has been running for
export const getTotalElapsedMs = (state) => {
  return getTimeEntriesElapsedMs(state.newWorkout.timeEntries)
}

export const getPrevExercise = ({ newWorkout }) => {
  const {
    currExerciseIdx,
    routine: { exercises },
  } = newWorkout
  if (currExerciseIdx === 0) {
    return exercises[exercises.length - 1]
  } else {
    return exercises[currExerciseIdx - 1]
  }
}

export const getCurrExercise = ({ newWorkout }) => {
  const {
    currExerciseIdx,
    routine: { exercises },
  } = newWorkout
  return exercises[currExerciseIdx]
}

export const getRoutine = (state) => {
  return state.newWorkout.routine
}

export const getCurrRound = ({ newWorkout }) => {
  return Math.min.apply(Math, [
    newWorkout.roundsCompleted + 1,
    newWorkout.routine.rounds,
  ])
}
