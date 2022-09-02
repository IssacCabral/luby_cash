import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StoreValidator from 'App/Validators/Client/StoreValidator'

export default class ClientsController {
  public async store({request, response}: HttpContextContract) {
    await request.validate(StoreValidator)

    return response.ok({message: 'tudo ok por enquanto'})
  }


}
