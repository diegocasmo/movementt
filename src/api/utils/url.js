export const getUrl = (nodeEnv = process.env.NODE_ENV) => {
  switch (nodeEnv) {
    case 'production':
      return 'https://movementt-api-dev.herokuapp.com/api/v1'

    case 'development':
    default:
      return 'http://localhost:3000/api/v1'
  }
}
