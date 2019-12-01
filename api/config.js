import firebase from 'firebase';
// TODO: Dynamically load correct config environment
import { firebaseConfig, googleConfig } from './env';

export const initializeApi = () => {
  firebase.initializeApp(firebaseConfig);
}

export const getGoogleConfig = () =>{
  return googleConfig;
}
