import axios from 'axios'
import { getUrl } from '_api/utils/url'
import User from '_api/user'

export const initializeApi = async () => {
  // Configure axios defaults
  axios.defaults.baseURL = getUrl()
  axios.defaults.headers.common['Authorization'] = await User.getToken()
}
