import axios from 'axios'
import { PRAKTIKUM_HOST, status } from '../constants'
import { NextFunction, Request, Response } from 'express'

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await axios.get(`${PRAKTIKUM_HOST}/auth/user`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })

    next()
  } catch (error) {
    res.status(status.NOT_AUTHORIZED).json({
      reason: 'Not authorized',
    })
  }
}

export default isAuthenticated
