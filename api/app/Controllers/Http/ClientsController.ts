import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StoreValidator from 'App/Validators/Client/StoreValidator'

import axios from 'axios'

import CreateApprovedClient from 'App/utils/CreateApprovedClient'

import {sendDesaprovedClientEmail} from '../../../kafka/execute_kafka_message/sendDesaprovedClientEmail'
import { sendNewClientEmail } from '../../../kafka/execute_kafka_message/sendNewClientEmail'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const result = await request.validate(StoreValidator)
    const { full_name, email, password, cpf } = result

    try {
      const res = await axios.post('http://evaluation:3334/clients', result)

      if (res.data.status == 'desaproved') {
        // send kafka message
        await sendDesaprovedClientEmail({full_name: res.data.full_name, email: res.data.email})

        return response.status(400).json({ message: 'Insufficient average salary to be a client' })
      }

      try {
        const client = await CreateApprovedClient({ full_name, email, password, cpf })

        // send kafkamessage
        await sendNewClientEmail({full_name: client.fullName, email: client.email})

        return response.created({ clientCreated: res.data })
      } catch (error) {
        return response.badRequest({ message: 'There was an error saving as a client', originalError: error.message })
      }

    } catch (err) {
      return response.badRequest({ message: 'unable to become a client', originalMessage: err?.response?.data })
    }

  }

}
