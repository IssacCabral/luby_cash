import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StoreValidator from 'App/Validators/Client/StoreValidator'

import axios from 'axios'

export default class ClientsController {
  public async store({request, response}: HttpContextContract) {
    const result = await request.validate(StoreValidator)

    const {data} = await axios.get("http://evaluation:3334")

    return response.ok({data})
  }


}
