require('./config') // eslint-disable-line no-undef
import axios from 'axios'
import * as Exercise from '_api/exercise'
import * as RoutineExercise from '_api/routine-exercise'
import * as Routine from '_api/routine'
import * as User from '_api/user'

// Make sure each request uses the most up-to-date Firebase auth token
axios.interceptors.request.use(
  async (config) => {
    try {
      const token = await User._firebaseUser().getIdToken()

      config.headers.common['Authorization'] = token || null
    } catch (err) {
      console.error(err.message)
    }

    return config
  },
  null,
  { synchronous: false }
)

export { Exercise, Routine, RoutineExercise, User }
