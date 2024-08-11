import { Topic } from '../models/topic.model'
import { status } from '../constants'
import { TopicModel } from '../db'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

const createTopic = async (
  req: Request,
  res: Response
) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(status.SERVER_ERROR).send({
        reason: errors.array(),
      })
      return
    }

    const newTopic: Topic = {
      name: req.body.name,
      description: req.body.description,
    }

    await TopicModel.create(newTopic)
    res
      .status(status.SUCCESS)
      .json({ info: 'Топик успешно создан' })
  } catch (error) {
    res.status(status.SERVER_ERROR).send({
      reason: error,
    })
  }
}

const getAllTopics = async (
  _req: Request,
  res: Response
) => {
  try {
    const topics = await TopicModel.findAll()
    res.status(status.SUCCESS).json(topics)
  } catch (error) {
    res.status(status.BAD_REQUEST).send({
      reason: error,
    })
  }
}

const getTopicById = async (
  req: Request,
  res: Response
) => {
  const topicId = req.params.id

  if (!topicId) {
    res.status(status.BAD_REQUEST).send(
      JSON.stringify({
        reason:
          'Отсутствует идентификатор топика',
      })
    )
    return
  }

  const topic = await TopicModel.findByPk(topicId)

  if (topic) {
    res.status(status.SUCCESS).json(topic)
  } else {
    res.status(status.NOT_FOUND).send(
      JSON.stringify({
        reason: `По идентификатору ${topicId} не найдено совпадений`,
      })
    )
  }
}

export default {
  createTopic,
  getAllTopics,
  getTopicById,
}
