import { Toast } from 'native-base'

export const showSuccess = msg => {
  Toast.show({ text: msg, type: 'success', duration: 5000 })
}

export const showWarning = msg => {
  Toast.show({ text: msg, type: 'warning', duration: 5000 })
}

export const showError = msg => {
  Toast.show({ text: msg, type: 'danger', duration: 5000 })
}
