import { QueryClient } from 'react-query'

function createQueryRetryCondition(
  acceptedErrorStatusCodes = [401],
  maxRetries = 3
) {
  const acceptedStatusCodesSet = new Set(acceptedErrorStatusCodes)

  return function shouldRetry(failureCount, error) {
    return (
      !acceptedStatusCodesSet.has(error.response?.status) &&
      failureCount <= maxRetries
    )
  }
}

export const defaultOptions = {
  queries: {
    retry: createQueryRetryCondition(),
  },
}

export const queryClient = new QueryClient({ defaultOptions })
