import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MessagesCustom from '../MessagesCustomValidator'

export default class StoreValidator extends MessagesCustom{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    full_name: schema.string({trim: true}, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.regex(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g)
    ]),

    email: schema.string({trim: true}, [
      rules.maxLength(50),
      rules.minLength(8),
      rules.email(),
      rules.unique({table: 'users', column: 'email'})
    ]),

    password: schema.string({}, [rules.maxLength(50)]),

    phone: schema.string([
      rules.regex(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)
    ]),

    cpf: schema.string([
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.unique({table: 'users', column: 'cpf'})
    ]),

    average_salary: schema.number([rules.unsigned()]),

    address: schema.object().members({
      street: schema.string({trim: true}, [rules.maxLength(250)]),
      city: schema.string({trim: true}, [rules.maxLength(50)]),
      state: schema.string({trim: true}, [rules.maxLength(2)]),
      zip_code: schema.string({}, [rules.regex(/^[0-9]{5}-[0-9]{3}$/)]),
    })
  })

}
