import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Validate,
} from 'sequelize-typescript'
import TopicModel from './topic.model'

export type Comments = {
  content: string
  topicId: string
}
@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'Comments',
})
class CommentsModel extends Model<Comments> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  commentId!: number

  @AllowNull(false)
  @Validate({
    notEmpty: true,
    max: 255,
  })
  @Column(DataType.STRING)
  content!: string

  @ForeignKey(() => TopicModel)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  topicId!: number
}

export default CommentsModel
