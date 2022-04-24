export const getWorkouts = (workouts) =>
  [...workouts].sort((a, z) => z.id - a.id)
