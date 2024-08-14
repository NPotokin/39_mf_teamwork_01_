import 'dotenv/config'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { TopicModel, CommentsModel, ReactionsModel, UserTheme } from './models'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [TopicModel, CommentsModel, UserTheme, ReactionsModel],
}

const sequelize = new Sequelize(sequelizeOptions)

const setupAssociations = () => {
  CommentsModel.hasMany(ReactionsModel, { foreignKey: 'commentId' })
  ReactionsModel.belongsTo(CommentsModel, { foreignKey: 'commentId' })

  UserTheme.hasMany(ReactionsModel, { foreignKey: 'userId' })
  ReactionsModel.belongsTo(UserTheme, { foreignKey: 'userId' })
}

setupAssociations()

export const createClientAndConnect = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    console.log('Connection has been established successfully.')
  } catch (error: unknown) {
    console.error('Unable to connect to the database:', error)
  }
}
