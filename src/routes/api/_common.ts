import type polka from 'polka'
import type http from 'http'

export const checkAuth = (req: polka.Request, res: http.ServerResponse) => {
  const token = req.headers.authorization
  console.log(token)
  if (token === undefined) {
    res.statusCode = 401
    res.end('no token')
  }
}
