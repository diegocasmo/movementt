import axios from 'axios'
import firebase from 'firebase'

// Make sure each request uses the most up-to-date Firebase auth token
axios.interceptors.request.use(
  async (config) => {
    try {
      let token
      const currentUser = firebase.auth().currentUser
      if (currentUser) {
        token = await currentUser.getIdToken()
      }

      config.headers.common['Authorization'] = token || null
    } catch (err) {
      console.error(err.message)
    }

    return config
  },
  null,
  { synchronous: false }
)

// Automatically sign user out if response status is 401
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      await firebase.auth().signOut()
    }

    return Promise.reject(error)
  }
)
