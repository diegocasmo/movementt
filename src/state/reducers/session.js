import { createSlice } from '@reduxjs/toolkit'
import { now, timestamp, getTotalEllapsedMs } from '_utils/time-utils'
import {
  TYPE_EXERCISE,
  TYPE_EXERCISE_REST,
  TYPE_ROUND_REST,
} from '_api/time-entry'

const initialState = {
  tick: null,
  has_sound: true,
  curr_exercise_idx: null,
  rounds_completed: 0,
  routine: null,
  time_entries: [],
}

const getCurrExerciseId = (state, timeEntryType) => {
  if (timeEntryType !== TYPE_EXERCISE) return null

  const currExercise = getCurrExercise({ session: state })
  return currExercise.id
}

const startTimeEntry = (type = TYPE_EXERCISE, exercise_id = null) => ({
  type,
  exercise_id,
  started_at: timestamp(now()),
  elapsed_ms: null,
})

const stopTimeEntry = (timeEntry) => {
  return {
    ...timeEntry,
    elapsed_ms: getTotalEllapsedMs(now(), timeEntry.started_at),
  }
}

const isTimeEntryRunning = ({ elapsed_ms }) => elapsed_ms === null
const isTimeEntryStopped = (timeEntry) => !isTimeEntryRunning(timeEntry)

const getTimeEntriesElapsedMs = (timeEntries) => {
  return timeEntries.reduce(
    (acc, timeEntry) =>
      timeEntry.elapsed_ms === null
        ? acc + getTotalEllapsedMs(now(), timeEntry.started_at)
        : acc + timeEntry.elapsed_ms,
    0
  )
}

const session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    init(state, { payload }) {
      state.routine = payload
    },

    reset: (state) => {
      state.tick = initialState.tick
      state.has_sound = initialState.has_sound
      state.curr_exercise_idx = initialState.curr_exercise_idx
      state.rounds_completed = initialState.rounds_completed
      state.routine = initialState.routine
      state.time_entries = initialState.time_entries
    },

    start(state, { payload }) {
      state.tick = payload
      state.curr_exercise_idx = 0

      const type = TYPE_EXERCISE
      state.time_entries = [
        startTimeEntry(type, getCurrExerciseId(state, type)),
      ]
    },

    play(state) {
      const { time_entries } = state
      const lastTimeEntry = time_entries[time_entries.length - 1]
      if (isTimeEntryStopped(lastTimeEntry)) {
        state.time_entries = [
          ...time_entries,
          startTimeEntry(
            lastTimeEntry.type,
            getCurrExerciseId(state, lastTimeEntry.type)
          ),
        ]
      }
    },

    stop(state) {
      let { time_entries } = state
      if (isTimeEntryRunning(time_entries[time_entries.length - 1])) {
        const lastTimeEntry = time_entries.pop()
        state.time_entries = [...time_entries, stopTimeEntry(lastTimeEntry)]
      }
    },

    tick(state, { payload }) {
      state.tick = payload
    },

    completeExercise(state) {
      let { curr_exercise_idx, rounds_completed, routine, time_entries } = state

      const lastTimeEntry = time_entries.pop()
      const currExercise = routine.exercises[curr_exercise_idx]
      const isLastExercise = curr_exercise_idx === routine.exercises.length - 1
      const isLastRound = rounds_completed === routine.rounds - 1

      if (isLastExercise && isLastRound) {
        state.curr_exercise_idx = null
        state.rounds_completed += 1
        state.time_entries = [...time_entries, stopTimeEntry(lastTimeEntry)]
      } else if (isLastExercise) {
        const nextTimeEntryType =
          routine.rest_seconds === 0 ? TYPE_EXERCISE : TYPE_ROUND_REST

        state.curr_exercise_idx = 0
        state.rounds_completed += 1
        state.time_entries = [
          ...time_entries,
          stopTimeEntry(lastTimeEntry),
          startTimeEntry(
            nextTimeEntryType,
            getCurrExerciseId(state, nextTimeEntryType)
          ),
        ]
      } else {
        const nextTimeEntryType =
          currExercise.rest_seconds === 0 ? TYPE_EXERCISE : TYPE_EXERCISE_REST

        state.curr_exercise_idx += 1
        state.time_entries = [
          ...time_entries,
          stopTimeEntry(lastTimeEntry),
          startTimeEntry(
            nextTimeEntryType,
            getCurrExerciseId(state, nextTimeEntryType)
          ),
        ]
      }
    },

    completeExerciseRest(state) {
      let { time_entries } = state
      const lastTimeEntry = time_entries.pop()

      const nextTimeEntryType = TYPE_EXERCISE
      state.time_entries = [
        ...time_entries,
        stopTimeEntry(lastTimeEntry),
        startTimeEntry(
          nextTimeEntryType,
          getCurrExerciseId(state, nextTimeEntryType)
        ),
      ]
    },

    completeRoundRest(state) {
      let { time_entries } = state
      const lastTimeEntry = time_entries.pop()

      const nextTimeEntryType = TYPE_EXERCISE
      state.time_entries = [
        ...time_entries,
        stopTimeEntry(lastTimeEntry),
        startTimeEntry(
          nextTimeEntryType,
          getCurrExerciseId(state, nextTimeEntryType)
        ),
      ]
    },

    toggleSound(state) {
      state.has_sound = !state.has_sound
    },
  },
})

export default session.reducer

// ------------------------- Action creators -------------------------

export const init = (routine) => (dispatch) => {
  dispatch(session.actions.init(routine))
}

export const resetSession = () => (dispatch) => {
  dispatch(session.actions.reset())
}

export const start = () => (dispatch) => {
  dispatch(session.actions.start(timestamp(now())))
}

export const play = () => (dispatch) => {
  dispatch(session.actions.play())
}

export const stop = () => (dispatch) => {
  dispatch(session.actions.stop())
}

export const tick = () => (dispatch) => {
  dispatch(session.actions.tick(timestamp(now())))
}

export const completeExercise = () => (dispatch) => {
  dispatch(session.actions.completeExercise())
}

export const completeExerciseRest = () => (dispatch) => {
  dispatch(session.actions.completeExerciseRest())
}

export const completeRoundRest = () => (dispatch) => {
  dispatch(session.actions.completeRoundRest())
}

export const toggleSound = () => (dispatch) => {
  dispatch(session.actions.toggleSound())
}

// ---------------------------- Selectors ----------------------------

// Return true if new session has started, false otherwise
export const hasStarted = (state) => {
  return state.session.tick !== null
}

// Return true if new session has sound, false otherwise
export const hasSound = (state) => {
  return state.session.has_sound
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
export const isCompleted = ({ session }) => {
  const currTimeEntry = getCurrTimeEntry({ session })
  return (
    session.curr_exercise_idx === null &&
    currTimeEntry &&
    isTimeEntryStopped(currTimeEntry)
  )
}

// Returns time entry which is currently running
export const getCurrTimeEntry = ({ session }) => {
  const { time_entries = [] } = session

  return time_entries[time_entries.length - 1]
}

// Return the total elapsed time in ms of the current time entry (including)
// time it has been stopped for
export const getCurrTimeEntryElapsedMs = ({ session }) => {
  let time_entries = [...session.time_entries]
  if (time_entries.length === 0) return 0

  const currTimeEntry = time_entries.pop()
  const prevTimeEntries = [currTimeEntry]

  let timeEntry = time_entries.pop()
  while (
    timeEntry &&
    timeEntry.type === currTimeEntry.type &&
    timeEntry.exercise_id === currTimeEntry.exercise_id
  ) {
    prevTimeEntries.push(timeEntry)
    timeEntry = time_entries.pop()
  }

  return getTimeEntriesElapsedMs(prevTimeEntries)
}

// Return the number of milliseconds the session has been running for
export const getTotalElapsedMs = (state) => {
  return getTimeEntriesElapsedMs(state.session.time_entries)
}

export const getPrevExercise = ({ session }) => {
  const {
    curr_exercise_idx,
    routine: { exercises },
  } = session
  if (curr_exercise_idx === 0) {
    return exercises[exercises.length - 1]
  } else {
    return exercises[curr_exercise_idx - 1]
  }
}

export const getCurrExercise = ({ session }) => {
  const {
    curr_exercise_idx,
    routine: { exercises },
  } = session
  return exercises[curr_exercise_idx]
}

export const getRoutine = (state) => {
  return state.session.routine
}

export const getCurrRound = ({ session }) => {
  return Math.min.apply(Math, [
    session.rounds_completed + 1,
    session.routine.rounds,
  ])
}

export const getStartedAt = ({ session }) => {
  const { time_entries = [] } = session
  if (time_entries.length <= 0) return -1

  return time_entries[0].started_at
}

export const getCompletedAt = ({ session }) => {
  const { time_entries = [] } = session
  if (time_entries.length <= 0) return -1

  const lastTimeEntry = time_entries[time_entries.length - 1]
  return lastTimeEntry.started_at + lastTimeEntry.elapsed_ms
}

export const getRoundsCompleted = (state) => {
  return state.session.rounds_completed
}

export const getTimeEntries = (state) => {
  return state.session.time_entries
}
