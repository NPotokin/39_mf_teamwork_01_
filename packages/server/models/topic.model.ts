import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Validate,
  Unique,
  Default,
} from 'sequelize-typescript'

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
  @Unique
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
}

export default TopicModel
