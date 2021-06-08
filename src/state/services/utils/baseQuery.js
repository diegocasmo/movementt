import { getUrl } from '_api/utils/url'
import axios from 'axios'

export const baseQuery = () => async ({ url, method, body }) => {
  try {
    const result = await axios({
      url: `${getUrl()}/${url}`,
      method,
      data: body,
    })

    return { data: result.data }
  } catch (axiosError) {
    let err = axiosError
    return { error: { status: err.response.status, data: err.response.data } }
  }
}
