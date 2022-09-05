import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MessagesCustom from '../MessagesCustomValidator'

export default class StoreValidator extends MessagesCustom{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    cpf_issuer: schema.string([
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.exists({column: 'cpf', table: 'users'})
    ]),

    cpf_recipient: schema.string([
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.exists({column: 'cpf', table: 'users'})
    ]),

    transfer_value: schema.number([rules.unsigned()]),
  })

}
