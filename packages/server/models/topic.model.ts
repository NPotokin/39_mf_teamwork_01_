import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export type Topic = {
  name: string
  description?: string
}

export const topicModel: ModelAttributes<Model<Topic>, Topic> = {
  name: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      max: 255,
    },
  },
  description: {
    type: DataType.TEXT,
    defaultValue: 'Описание отсутствует',
    validate: {
      max: 255,
    },
  },
}
