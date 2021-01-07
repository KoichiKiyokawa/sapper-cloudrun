import firebase from 'firebase/app'
import { firebaseConfig } from '../env'
import 'firebase/auth'
import 'firebase/firestore'

if (process.browser && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
export const firestore = firebase.firestore()
