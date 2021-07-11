import { createSelector } from 'reselect'

export const getWorkouts = createSelector(
  [(workouts = []) => workouts],
  (workouts) => {
    return [...workouts].sort((a, z) => z.id - a.id)
  }
)
