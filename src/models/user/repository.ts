import type firebase from 'firebase/app'
import { firestoreAdmin } from '../util'
import { convertTimestampToDateRecursively } from '../util'

type FromFirestore<T extends Object> = {
  [K in keyof T]: T[K] extends Date ? firebase.firestore.Timestamp : T[K] extends Object ? FromFirestore<T[K]> : T[K]
}

export class UserRepository {
  get collectionName(): string {
    return 'users'
  }

  get collectionReference(): firebase.firestore.CollectionReference<User> {
    const firestore = (firestoreAdmin as unknown) as firebase.firestore.Firestore
    return firestore.collection(this.collectionName).withConverter<User>({
      fromFirestore: (snap) => convertTimestampToDateRecursively<User>(snap.data()),
      toFirestore: (data: User) => data,
    })
  }

  async all(): Promise<{ id: ID; data: User }[]> {
    const querySnapshot = await this.collectionReference.get()
    return querySnapshot.docs.flatMap((doc) => {
      const data = doc.data()
      if (data === undefined) return []
      return { id: doc.id, data }
    })
  }
}
