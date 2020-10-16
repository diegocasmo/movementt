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

const getCurrExerciseUid = (state, timeEntryType) => {
  if (timeEntryType !== TIME_ENTRY_TYPE.EXERCISE) return null

  const currExercise = getCurrExercise({ createWorkout: state })
  return currExercise.uid
}

const startTimeEntry = (
  type = TIME_ENTRY_TYPE.EXERCISE,
  exerciseUid = null
) => ({
  type,
  exerciseUid,
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

const createWorkout = createSlice({
  name: 'createWorkout',
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

      const type = TIME_ENTRY_TYPE.EXERCISE
      state.timeEntries = [
        startTimeEntry(type, getCurrExerciseUid(state, type)),
      ]
    },

    play(state) {
      const { timeEntries } = state
      const lastTimeEntry = timeEntries[timeEntries.length - 1]
      if (isTimeEntryStopped(lastTimeEntry)) {
        state.timeEntries = [
          ...timeEntries,
          startTimeEntry(
            lastTimeEntry.type,
            getCurrExerciseUid(state, lastTimeEntry.type)
          ),
        ]
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
          startTimeEntry(
            nextTimeEntryType,
            getCurrExerciseUid(state, nextTimeEntryType)
          ),
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
          startTimeEntry(
            nextTimeEntryType,
            getCurrExerciseUid(state, nextTimeEntryType)
          ),
        ]
      }
    },

    completeExerciseRest(state) {
      let { timeEntries } = state
      const lastTimeEntry = timeEntries.pop()

      const nextTimeEntryType = TIME_ENTRY_TYPE.EXERCISE
      state.timeEntries = [
        ...timeEntries,
        stopTimeEntry(lastTimeEntry),
        startTimeEntry(
          nextTimeEntryType,
          getCurrExerciseUid(state, nextTimeEntryType)
        ),
      ]
    },

    completeRoundRest(state) {
      let { timeEntries } = state
      const lastTimeEntry = timeEntries.pop()

      const nextTimeEntryType = TIME_ENTRY_TYPE.EXERCISE
      state.timeEntries = [
        ...timeEntries,
        stopTimeEntry(lastTimeEntry),
        startTimeEntry(
          nextTimeEntryType,
          getCurrExerciseUid(state, nextTimeEntryType)
        ),
      ]
    },

    toggleSound(state) {
      state.hasSound = !state.hasSound
    },
  },
})

export default createWorkout.reducer

// ------------------------- Action creators -------------------------

export const init = (routine) => (dispatch) => {
  dispatch(createWorkout.actions.init(routine))
}

export const resetWorkout = () => (dispatch) => {
  dispatch(createWorkout.actions.reset())
}

export const start = () => (dispatch) => {
  dispatch(createWorkout.actions.start(timestamp(now())))
}

export const play = () => (dispatch) => {
  dispatch(createWorkout.actions.play())
}

export const stop = () => (dispatch) => {
  dispatch(createWorkout.actions.stop())
}

export const tick = () => (dispatch) => {
  dispatch(createWorkout.actions.tick(timestamp(now())))
}

export const completeExercise = () => (dispatch) => {
  dispatch(createWorkout.actions.completeExercise())
}

export const completeExerciseRest = () => (dispatch) => {
  dispatch(createWorkout.actions.completeExerciseRest())
}

export const completeRoundRest = () => (dispatch) => {
  dispatch(createWorkout.actions.completeRoundRest())
}

export const toggleSound = () => (dispatch) => {
  dispatch(createWorkout.actions.toggleSound())
}

// ---------------------------- Selectors ----------------------------

// Return true if new workout has started, false otherwise
export const hasStarted = (state) => {
  return state.createWorkout.tick !== null
}

// Return true if new workout has sound, false otherwise
export const hasSound = (state) => {
  return state.createWorkout.hasSound
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
export const isCompleted = ({ createWorkout }) => {
  const currTimeEntry = getCurrTimeEntry({ createWorkout })
  return (
    createWorkout.currExerciseIdx === null &&
    currTimeEntry &&
    isTimeEntryStopped(currTimeEntry)
  )
}

// Returns time entry which is currently running
export const getCurrTimeEntry = ({ createWorkout }) => {
  const { timeEntries = [] } = createWorkout

  return timeEntries[timeEntries.length - 1]
}

// Return the total elapsed time in ms of the current time entry (including)
// time it has been stopped for
export const getCurrTimeEntryElapsedMs = ({ createWorkout }) => {
  let timeEntries = [...createWorkout.timeEntries]
  if (timeEntries.length === 0) return 0

  const currTimeEntry = timeEntries.pop()
  const prevTimeEntries = [currTimeEntry]

  let timeEntry = timeEntries.pop()
  while (
    timeEntry &&
    timeEntry.type === currTimeEntry.type &&
    timeEntry.exerciseUid === currTimeEntry.exerciseUid
  ) {
    prevTimeEntries.push(timeEntry)
    timeEntry = timeEntries.pop()
  }

  return getTimeEntriesElapsedMs(prevTimeEntries)
}

// Return the number of milliseconds the workout has been running for
export const getTotalElapsedMs = (state) => {
  return getTimeEntriesElapsedMs(state.createWorkout.timeEntries)
}

export const getPrevExercise = ({ createWorkout }) => {
  const {
    currExerciseIdx,
    routine: { exercises },
  } = createWorkout
  if (currExerciseIdx === 0) {
    return exercises[exercises.length - 1]
  } else {
    return exercises[currExerciseIdx - 1]
  }
}

export const getCurrExercise = ({ createWorkout }) => {
  const {
    currExerciseIdx,
    routine: { exercises },
  } = createWorkout
  return exercises[currExerciseIdx]
}

export const getRoutine = (state) => {
  return state.createWorkout.routine
}

export const getCurrRound = ({ createWorkout }) => {
  return Math.min.apply(Math, [
    createWorkout.roundsCompleted + 1,
    createWorkout.routine.rounds,
  ])
}

export const getStartedAt = ({ createWorkout }) => {
  const { timeEntries = [] } = createWorkout
  if (timeEntries.length <= 0) return -1

  return timeEntries[0].startedAt
}

export const getDoneAt = ({ createWorkout }) => {
  const { timeEntries = [] } = createWorkout
  if (timeEntries.length <= 0) return -1

  const lastTimeEntry = timeEntries[timeEntries.length - 1]
  return lastTimeEntry.startedAt + lastTimeEntry.elapsedMs
}
