import firebase from 'firebase/app'
import { firebaseConfig } from '../env'
import 'firebase/auth'
import 'firebase/firestore'

if (!process.browser) console.log('server!')

if (process.browser && !firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
export const firestore = firebase.firestore()
