// eslint-disable-next-line no-undef
const nodeEnv = process.env.NODE_ENV

export const isDev = () => nodeEnv === 'development'

export const isProduction = () => nodeEnv === 'production'
