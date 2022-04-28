// eslint-disable-next-line no-undef
const nodeEnv = process.env.NODE_ENV

export const throwError = (
  err,
  msg = 'Sorry, we were unable to complete the request'
) => {
  switch (nodeEnv) {
    case 'production':
      throw new Error(msg)
    default:
      throw new Error(err.message)
  }
}
