import { Topic } from '../models/topic.model'
import { status } from '../constants'
import { TopicModel } from '../db'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(status.SERVER_ERROR).json({
        reason: errors.array(),
      })
      return
    }

    const newTopic: Topic = {
      name: req.body.name,
      description: req.body.description,
    }

    await TopicModel.create(newTopic)

    res.status(status.SUCCESS).json({ info: 'Топик успешно создан' })
  } catch (error) {
    next(error)
  }
}

const getAllTopics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await TopicModel.findAll()
    res.status(status.SUCCESS).json(topics)
  } catch (error) {
    next(error)
  }
}

const getTopicById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicId = req.params.id

    if (!topicId) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Отсутствует идентификатор топика',
      })
      return
    }

    const topic = await TopicModel.findByPk(topicId)

    if (topic) {
      res.status(status.SUCCESS).json(topic)
    } else {
      res.status(status.NOT_FOUND).json({
        reason: `По идентификатору ${topicId} не найдено совпадений`,
      })
    }
  } catch (error) {
    next(error)
  }
}

export default {
  createTopic,
  getAllTopics,
  getTopicById,
}
