import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'

import Role from './Role'

import Hash from '@ioc:Adonis/Core/Hash'

import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import {compose} from '@ioc:Adonis/Core/Helpers'
import UserFilter from './Filters/UserFilter'

export default class User extends compose(BaseModel, Filterable) {
  public static $filter = () => UserFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public fullName: string

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column()
  public cpf: string

  @column({serializeAs: null})
  public rememberMeToken?: string | null

  @column({serializeAs: null})
  public rememberMeTokenCreatedAt?: DateTime | null

  @manyToMany(() => Role, {
    pivotTable: 'user_roles'
  })
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
