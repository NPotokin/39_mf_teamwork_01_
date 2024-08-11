import {
  DataType,
  Model,
} from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export type Topic = {
  name: string
  count?: number
  description?: string
}

export const topicModel: ModelAttributes<
  Model<Topic>,
  Topic
> = {
  name: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 255],
    },
  },
  count: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataType.STRING,
    defaultValue: 'Описание отсутствует',
  },
}
