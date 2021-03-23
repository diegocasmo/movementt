import axios from 'axios'
import { getUrl } from '_api/utils/url'

export const initializeApi = () => {
  // Configure axios defaults
  axios.defaults.baseURL = getUrl()
}

import * as Exercise from '_api/exercise'
import * as User from '_api/user'

export { Exercise, User }
