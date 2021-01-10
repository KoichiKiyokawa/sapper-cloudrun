import { firebase } from '@/plugins/firebase'

export async function api(endpoint: string, data: Object = {}, { auth }: { auth: boolean } = { auth: false }) {
  const token = auth ? await firebase.auth().currentUser?.getIdToken() : undefined
  return {
    get: () => common(endpoint, 'GET', data, token),
    post: () => common(endpoint, 'POST', data, token),
  }
}

function common(endpoint: string, method: 'GET' | 'POST', data: Object, token?: string) {
  return fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
}
