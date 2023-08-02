// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV

export const baseURL = ((nodeEnv) => {
  switch (nodeEnv) {
    case 'production':
      return ''

    case 'development':
    default:
      return 'http://localhost:3000'
  }
})(NODE_ENV)
