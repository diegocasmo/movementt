import { Toast } from 'native-base'

export const showSuccess = (msg = {}) => {
  showMessage(msg, 'success')
}

export const showWarning = (msg = {}) => {
  showMessage(msg, 'warning')
}

export const showError = (msg = {}) => {
  showMessage(msg)
}

const showMessage = (msg, type = 'danger') => {
  Toast.show({
    text: msg.message || msg,
    type,
    duration: 5000,
    buttonText: 'X',
  })
}
