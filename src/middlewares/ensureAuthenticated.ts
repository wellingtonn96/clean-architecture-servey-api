import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { jwt } from '../config/auth'
import UserRepository from '../repositories/UserRepository'

interface tokenPayload {
  iat: number
  exp: number
  sub: string
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ err: 'Jwt token is missing' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, jwt.secret)

    const { sub } = decoded as tokenPayload

    const userRepository = new UserRepository()

    const userExists = await userRepository.findById(sub)

    if (userExists == null) {
      return response.status(401).json({ err: 'Invalid JWT token' })
    }

    request.user = {
      id: sub
    }

    return next()
  } catch (error) {
    return response.status(401).json({ err: 'Invalid JWT token' })
  }
}

export { ensureAuthenticated }
