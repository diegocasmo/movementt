import { User } from '_api'
import { getUrl } from '_api/utils/url'
import { retry, fetchBaseQuery } from '@rtk-incubator/rtk-query'

const baseQuery = fetchBaseQuery({
  baseUrl: getUrl(),
  prepareHeaders: async (headers) => {
    const token = await User._firebaseUser().getIdToken()
    headers.set('Authorization', `${token || ''}`)
    return headers
  },
})

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })
