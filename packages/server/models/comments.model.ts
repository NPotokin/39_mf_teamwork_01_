import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export type Comments = {
  content: string
  topicId: string
}

export const commentsModel: ModelAttributes<Model<Comments>, Comments> = {
  content: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 255,
    },
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: { tableName: 'Topics' },
      key: 'id',
    },
  },
}
