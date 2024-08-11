import { status } from '../constants'
import { NextFunction, Request, Response } from 'express'
import { UniqueConstraintError } from 'sequelize'

const ErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware Error Hadnling')

  if (err instanceof UniqueConstraintError) {
    res.status(status.BAD_REQUEST).json({
      reason: err.errors.map(error => error.message).join(','),
    })
  } else {
    const errMsg = err instanceof Error ? err.message : 'Не известная ошибка'
    res.status(status.SERVER_ERROR).json({
      reason: errMsg,
    })
  }

  next()
}

export default ErrorHandler
