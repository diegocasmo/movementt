import { sortByDescPosition } from '_utils/sort'

export const getWorkouts = (workouts = []) => sortByDescPosition(workouts, 'id')
