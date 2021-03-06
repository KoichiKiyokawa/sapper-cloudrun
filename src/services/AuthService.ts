import { firebase } from '@/plugins/firebase'

export class AuthService {
  static async login(email: string, password: string): Promise<string | undefined> {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    return response.user?.getIdToken()
  }

  static logout() {
    return firebase.auth().signOut()
  }

  static getToken() {
    return firebase.auth().currentUser?.getIdToken()
  }

  static async checkAuth(): Promise<boolean> {
    try {
      await new Promise((res, rej) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user == null) rej()
          else res(true)
        }, rej)
      })
      return true
    } catch {
      return false
    }
  }
}
