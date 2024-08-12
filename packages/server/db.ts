import 'dotenv/config'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { commentsModel, topicModel } from './models'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const TopicModel = sequelize.define('Topic', topicModel, { timestamps: false })
export const CommentsModel = sequelize.define('Comments', commentsModel)

TopicModel.hasMany(CommentsModel, { onDelete: 'CASCADE', hooks: true })
CommentsModel.belongsTo(TopicModel)

export const createClientAndConnect = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    console.log('Connection has been established successfully.')
  } catch (error: unknown) {
    console.error('Unable to connect to the database:', error)
  }
}
