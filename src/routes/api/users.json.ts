import { UserRepository } from '@/models/user/repository'
import type polka from 'polka'
import { checkAuth } from './_common'

export async function get(req: polka.Request, res: any) {
  checkAuth(req, res)

  const users = await new UserRepository().all().catch(console.error)
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(users))
}
