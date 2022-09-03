import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StoreValidator from 'App/Validators/Client/StoreValidator'

import axios from 'axios'

import { ReturnClientAfterCreate } from 'App/utils/ReturnClient'
import CreateApprovedClient from 'App/utils/CreateApprovedClient'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const result = await request.validate(StoreValidator)
    const { full_name, email, password, cpf } = result

    try {
      const res = await axios.post('http://evaluation:3334/clients', result)

      if (res.data.status == 'desaproved') return response.status(400).json({ message: 'Insufficient average salary to be a client' })

      try {
        const client = await CreateApprovedClient({ full_name, email, password, cpf })

        return response.created({ clientCreated: await ReturnClientAfterCreate(client.cpf) })
      } catch (error) {
        return response.badRequest({ message: 'There was an error saving as a client', originalError: error.message })
      }

    } catch (err) {
      return response.badRequest({ message: 'unable to become a client', originalMessage: err?.response?.data })
    }

  }


}
