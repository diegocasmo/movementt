import { API_URL_PROD, API_URL_DEV } from '@env'

export const baseURL = ((nodeEnv) => {
  switch (nodeEnv) {
    case 'production':
      return API_URL_PROD

    case 'development':
    default:
      return API_URL_DEV
  }
})(process.env.NODE_ENV) // eslint-disable-line no-undef
