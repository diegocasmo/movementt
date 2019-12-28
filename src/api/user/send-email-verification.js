import { currentUser } from './current-user'

export const sendEmailVerification = async (user = currentUser()) => {
  return user.sendEmailVerification()
}
