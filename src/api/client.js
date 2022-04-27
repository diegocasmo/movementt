import axios from 'axios'
import { baseURL } from './config'

const ApiClient = axios.create({
  baseURL,
})

export function makeApiService(serviceConfiguration) {
  const { path, method = 'GET' } = serviceConfiguration

  return async () => {
    // TODO: Transform params
    const axiosRequestConfig = {
      method,
      url: path,
    }

    return ApiClient.request(axiosRequestConfig)
  }
}
