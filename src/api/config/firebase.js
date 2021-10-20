import firebase from 'firebase'
import {
  FIREBASE_API_KEY_DEV,
  FIREBASE_AUTH_DOMAIN_DEV,
  FIREBASE_DATABASE_URL_DEV,
  FIREBASE_PROJECT_ID_DEV,
  FIREBASE_STORAGE_BUCKET_DEV,
  FIREBASE_MESSAGING_SENDERID_DEV,
  FIREBASE_APP_ID_DEV,
  FIREBASE_API_KEY_PROD,
  FIREBASE_AUTH_DOMAIN_PROD,
  FIREBASE_DATABASE_URL_PROD,
  FIREBASE_PROJECT_ID_PROD,
  FIREBASE_STORAGE_BUCKET_PROD,
  FIREBASE_MESSAGING_SENDERID_PROD,
  FIREBASE_APP_ID_PROD,
} from '@env'

const config = ((nodeEnv) => {
  switch (nodeEnv) {
    case 'production':
      return {
        apiKey: FIREBASE_API_KEY_PROD,
        authDomain: FIREBASE_AUTH_DOMAIN_PROD,
        databaseURL: FIREBASE_DATABASE_URL_PROD,
        projectId: FIREBASE_PROJECT_ID_PROD,
        storageBucket: FIREBASE_STORAGE_BUCKET_PROD,
        messagingSenderId: FIREBASE_MESSAGING_SENDERID_PROD,
        appId: FIREBASE_APP_ID_PROD,
      }

    case 'development':
    default:
      return {
        apiKey: FIREBASE_API_KEY_DEV,
        authDomain: FIREBASE_AUTH_DOMAIN_DEV,
        databaseURL: FIREBASE_DATABASE_URL_DEV,
        projectId: FIREBASE_PROJECT_ID_DEV,
        storageBucket: FIREBASE_STORAGE_BUCKET_DEV,
        messagingSenderId: FIREBASE_MESSAGING_SENDERID_DEV,
        appId: FIREBASE_APP_ID_DEV,
      }
  }
})(process.env.NODE_ENV) // eslint-disable-line no-undef

const app = firebase.initializeApp(config)

export const db = app.database()
