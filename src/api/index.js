import axios from 'axios'
import { getUrl } from '_api/utils/url'

export const initializeApi = () => {
  // Configure axios defaults
  axios.defaults.baseURL = getUrl()
}
