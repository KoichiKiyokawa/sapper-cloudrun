import { UserRepository } from '@/models/user/repository'
import type polka from 'polka'
import { checkAuth } from './_common'

export async function get(req: polka.Request, res: any) {
  res.setHeader('Content-Type', 'application/json')
  checkAuth(req, res)

  const users = await new UserRepository().all().catch(console.error)
  res.end(JSON.stringify(users))
}
