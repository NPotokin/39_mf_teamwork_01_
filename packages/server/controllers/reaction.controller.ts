import { NextFunction, Request, Response } from 'express'
import { ReactionsModel } from '../models'
import { status } from '../constants'

const setEmoji = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId, emoji } = req.body

    if (!commentId || !emoji) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Comment ID and emoji are required',
      })
      return
    }

    const newReaction = await ReactionsModel.create({ commentId, emoji })

    res.status(status.SUCCESS).json(newReaction)
  } catch (error) {
    next(error)
  }
}

const getAllEmojisForComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = req.params.id

    if (!commentId) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Comment ID is required',
      })
      return
    }

    const reactions = await ReactionsModel.findAll({
      where: {
        commentId,
      },
      attributes: [
        'emoji',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [ReactionsModel.sequelize!.fn('COUNT', ReactionsModel.sequelize!.col('emoji')), 'count'],
      ],
      group: ['emoji'],
    })

    res.status(status.SUCCESS).json(reactions)
  } catch (error) {
    next(error)
  }
}

export { setEmoji, getAllEmojisForComment }
