import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/Transaction/StoreValidator'
import VerifyCpfsInput from 'App/utils/VerifyCpfsInput'

import axios from 'axios'

import { sendIssuerTransactionEmail } from '../../../kafka/execute_kafka_message/sendIssuerTransactionEmail'
import { sendRecipientTransactionEmail } from '../../../kafka/execute_kafka_message/sendRecipientTransactionEmail'

import User from 'App/Models/User'
import Transaction from 'App/Models/Transaction'

import returnClientToCheckTheirTransactions from 'App/utils/returnClientToCheckTheirTransactions'

export default class TransactionsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { cpf_issuer, cpf_recipient } = await request.validate(StoreValidator)
    const { transfer_value } = request.only(['transfer_value'])

    try {
      await VerifyCpfsInput(cpf_issuer, cpf_recipient, auth)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }

    const issuer = await User.query().where('cpf', cpf_issuer).firstOrFail()
    const recipient = await User.query().where('cpf', cpf_recipient).firstOrFail()

    try {
      const result = await axios.post('http://evaluation:3334/transactions', { cpf_issuer, cpf_recipient, transfer_value })

      try{
        const transaction = new Transaction()

        transaction.fill({
          cpfIssuer: cpf_issuer,
          cpfRecipient: cpf_recipient,
          transferValue: transfer_value
        })

        await transaction.save()
      } catch(error){
        return response.badRequest({message: 'error in save transaction', originalError: error.message})
      }

      try {
        // send kafka messages
        await sendIssuerTransactionEmail({ full_name: issuer.fullName, recipient_name: recipient.fullName, email: issuer.email, transfer_value })
        await sendRecipientTransactionEmail({ full_name: recipient.fullName, issuer_name: issuer.fullName, email: recipient.email, transfer_value })
      } catch (error) {
        return response.badRequest({message: 'error in send kafka message', originalError: error.message})
      }

      return response.ok(result.data)
    } catch (error) {
      return response.badRequest({ message: 'transaction error', originalError: error?.response?.data })
    }

  }

  public async index({request, response, params}: HttpContextContract){
    const clientCpf = params.clientCpf

    try{
      const client = await returnClientToCheckTheirTransactions(clientCpf)
      return response.ok(client)
    } catch(error){
      return response.badRequest({message: 'client not found', originalError: error.message})
    }


    

  }

}
