import SiteTheme from './models/theme.model'
import UserTheme from './models/user.model'
import 'dotenv/config'
import {
  Sequelize,
  SequelizeOptions,
} from 'sequelize-typescript'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [UserTheme, SiteTheme],
}

const sequelize = new Sequelize(sequelizeOptions)

export const createClientAndConnect =
  async (): Promise<void> => {
    try {
      await sequelize.authenticate()
      //   await sequelize.sync()
      await sequelize.sync({ alter: true })
      console.log(
        'Connection has been established successfully.'
      )
    } catch (error: unknown) {
      console.error(
        'Unable to connect to the database:',
        error
      )
    }
  }
