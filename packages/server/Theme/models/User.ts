import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript'
import SiteTheme from './Theme'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  externalId!: number // Идентификатор записи

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId!: number // Внешний ключ на SiteTheme

  @Column(DataType.STRING)
  device?: string // Устройство пользователя (например, 'Smartphone')

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: number // Идентификатор пользователя
}

export default UserTheme
// import { Model, Table, Column, DataType, PrimaryKey, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
// import SiteTheme from './Theme'; // Путь к модели SiteTheme

// @Table({
//     timestamps: false,
//     tableName: 'user_theme',
// })
// class UserTheme extends Model<UserTheme> {
//     @PrimaryKey
//     @AllowNull(false)
//     @Column(DataType.INTEGER)
//     userId!: number;

//     @AllowNull(false)
//     @ForeignKey(() => SiteTheme) // Указываем, что это внешний ключ, который ссылается на SiteTheme
//     @Column(DataType.INTEGER)
//     themeId!: number; // Внешний ключ для связи с таблицей SiteTheme

//     @BelongsTo(() => SiteTheme)
//     siteTheme!: SiteTheme; // Связь с SiteTheme

//     @AllowNull(true)
//     @Column(DataType.STRING)
//     description?: string;
// }

// export default UserTheme;
