import { NextFunction, Request, Response } from 'express'
import { status } from '../constants'
import { CommentsModel, Comments } from '../models'

const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicId = req.params.id

    if (!topicId) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Отсутствует идентификатор топика',
      })
      return
    }
    const newComment: Comments = {
      content: req.body.content,
      topicId,
    }

    await CommentsModel.create(newComment)

    res.status(status.SUCCESS).send('ok')
  } catch (error) {
    next(error)
  }
}

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = req.params.id

    if (!commentId) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Отсутствует идентификатор комменатрия',
      })
      return
    }

    const comment = await CommentsModel.findByPk(commentId)

    if (comment) {
      await comment.destroy()
      res.status(status.SUCCESS).send('ok')
    } else {
      res.status(status.NOT_FOUND).json({
        reason: `По идентификатору ${commentId} не найдено совпадений`,
      })
    }
  } catch (error) {
    next(error)
  }
}

const getCommentsOnTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicId = req.params.id

    if (!topicId) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Отсутствует идентификатор топика',
      })
      return
    }

    const comments = await CommentsModel.findAll({
      where: {
        topicId,
      },
    })

    res.status(status.SUCCESS).json(comments)
  } catch (error) {
    next(error)
  }
}

export { addComment, deleteComment, getCommentsOnTopic }
