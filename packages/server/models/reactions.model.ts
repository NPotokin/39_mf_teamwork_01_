import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import CommentsModel from './comments.model'

export type Reactions = {
  emoji: string
  commentId: string // Нужно потом проверить
}

@Table({
  timestamps: false,
  tableName: 'Reactions',
})
class ReactionsModel extends Model<Reactions> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  reactionId!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  emoji!: string

  @ForeignKey(() => CommentsModel)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  commentId!: number

  @BelongsTo(() => CommentsModel)
  comment!: CommentsModel
}

export default ReactionsModel
