import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Validate,
  Default,
  HasMany,
} from 'sequelize-typescript'
import CommentsModel, { Comments } from './comments.model'

export type Topic = {
  name: string
  description?: string
}
@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'Topics',
})
class TopicModel extends Model<Topic> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  topicId!: number

  @AllowNull(false)
  @Validate({
    notEmpty: true,
    max: 255,
  })
  @Column(DataType.STRING)
  name!: string

  @Default('Описание отсутствует')
  @Validate({
    max: 255,
  })
  @Column(DataType.TEXT)
  description!: string

  @HasMany(() => CommentsModel)
  comments!: Comments[]
}

export default TopicModel
