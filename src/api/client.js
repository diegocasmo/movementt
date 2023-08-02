import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { baseURL } from './config'

const ApiClient = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
})

// Make sure each request uses the most up-to-date Firebase auth token
ApiClient.interceptors.request.use(
  async (config) => {
    try {
      let token = null
      const currentUser = getAuth().currentUser
      if (currentUser) {
        token = await currentUser.getIdToken()
      }

      config.headers.common['Authorization'] = token
    } catch (err) {
      console.error(err.message)
    }

    return config
  },
  null,
  { synchronous: false }
)

// Automatically sign user out if response status is 401
ApiClient.interceptors.response.use(
  (response = {}) => {
    return response.data
  },
  async (error) => {
    if (error.response.status === 401) {
      await getAuth().signOut()
    }

    return Promise.reject(error)
  }
)

export function makeApiService(serviceConfiguration) {
  const {
    path,
    method = 'GET',
    APIVersion = '/api/v1',
    transformRequest,
  } = serviceConfiguration

  return async (requestConfig = {}) => {
    const { bodyParams, pathParams, queryParams } = requestConfig

    const url = path.replace(/\[(.*?)\]/g, (_, $1) => pathParams[$1])

    const axiosRequestConfig = {
      url: `${APIVersion}/${url}`,
      method,
      ...(queryParams ? { params: queryParams } : {}),
      ...(bodyParams ? { data: bodyParams } : {}),
      ...(transformRequest ? { transformRequest } : {}),
    }

    return ApiClient.request(axiosRequestConfig)
  }
}
