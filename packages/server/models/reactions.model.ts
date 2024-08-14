import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Unique,
  BelongsTo,
} from 'sequelize-typescript'
import CommentsModel from './comments.model'
import UserTheme from './user.model'

export type Reactions = {
  reactionId: number
  emoji: string
  commentId: number
  userId: number
  reactionIdentifier: string
}

@Table({
  timestamps: false,
  tableName: 'Reactions',
})
class ReactionsModel extends Model {
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

  @ForeignKey(() => UserTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number

  @Unique('unique_reaction_per_user_comment')
  @Column(DataType.STRING)
  reactionIdentifier!: string

  @BelongsTo(() => CommentsModel)
  comment!: CommentsModel

  @BelongsTo(() => UserTheme)
  user!: UserTheme
}

export default ReactionsModel
