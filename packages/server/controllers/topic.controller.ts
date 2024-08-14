import { TopicModel, Topic, CommentsModel } from '../models'
import { status } from '../constants'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { col, fn } from 'sequelize'

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

    res.status(status.SUCCESS).json({ info: 'Success' })
  } catch (error) {
    next(error)
  }
}

const updateTopicDescription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicId = req.params.id

    if (!topicId) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Topic id missed',
      })
      return
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(status.SERVER_ERROR).json({
        reason: errors.array(),
      })
      return
    }

    const newDescription = req.body.description

    const topic = await TopicModel.findByPk(topicId)

    if (topic) {
      await topic.update({ description: newDescription })
      res.status(status.SUCCESS).json({ info: 'Succes' })
    } else {
      res.status(status.NOT_FOUND).json({
        reason: 'No matches found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicId = req.params.id

    if (!topicId) {
      res.status(status.BAD_REQUEST).json({
        reason: 'Topic id missed',
      })
      return
    }

    const topic = await TopicModel.findByPk(topicId)

    if (topic) {
      await topic.destroy()
      res.status(status.SUCCESS).json({ info: 'Success' })
    } else {
      res.status(status.NOT_FOUND).json({
        reason: 'No matches found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const getAllTopics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await TopicModel.findAll({
      attributes: [
        'topicId',
        'name',
        'description',
        [fn('COUNT', col('comments.topicId')), 'count'],
      ],
      include: {
        model: CommentsModel,
        as: 'comments',
        attributes: [],
      },
      group: ['TopicModel.topicId'],
      order: ['topicId'],
    })
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
        reason: 'Topic id missed',
      })
      return
    }

    const topic = await TopicModel.findByPk(topicId)

    if (topic) {
      res.status(status.SUCCESS).json(topic)
    } else {
      res.status(status.NOT_FOUND).json({
        reason: 'No matches found',
      })
    }
  } catch (error) {
    next(error)
  }
}

export { createTopic, updateTopicDescription, deleteTopic, getAllTopics, getTopicById }
