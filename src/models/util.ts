import firebase from 'firebase/app'

/**
 * firestoreにクエリした結果にはTimestampが混じっている。
 * そのままでは扱いづらいので、再帰的にすべてのTimestampをDateに変換する
 * @param data firestoreのTimestampが混じったオブジェクト
 */
export const convertTimestampToDateRecursively = <T extends Object>(data: Object): T =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value instanceof firebase.firestore.Timestamp
        ? value.toDate()
        : isObject(value)
        ? convertTimestampToDateRecursively(value)
        : value,
    ])
  ) as T

function isObject(value: any): value is Object {
  const type = typeof value
  return value != null && (type == 'object' || type == 'function')
}
