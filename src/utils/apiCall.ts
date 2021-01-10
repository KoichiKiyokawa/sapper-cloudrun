import { AuthService } from '@/services/AuthService'
import fetch from 'node-fetch'

/**
 * @example
 * api.get('/users')
 */
export const api = {
  get: <T>(
    endpoint: string,
    { data, auth }: { data?: Object; auth: boolean } = { auth: false }
  ): Promise<T | undefined> => common<T>(endpoint, 'GET', data, { auth }),
  post: <T>(
    endpoint: string,
    { data, auth }: { data?: Object; auth: boolean } = { auth: false }
  ): Promise<T | undefined> => common<T>(endpoint, 'POST', data, { auth }),
}

async function common<T>(
  endpoint: string,
  method: 'GET' | 'POST',
  data?: Object,
  { auth }: { auth: boolean } = { auth: false }
): Promise<T | undefined> {
  if (auth && !process.browser) return undefined

  const token = await AuthService.getToken()
  console.log({ token })
  const basePath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.DOMAIN
  return fetch(basePath + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
    },
    ...(data && { body: JSON.stringify(data) }),
  }).then((res) => res.json())
}
