import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Transaction/StoreValidator'
import VerifyCpfsInput from 'App/utils/VerifyCpfsInput'

// o valor da transferência deve ser maior ou igual ao valor em conta do cpf_issuer
// após salvar a transferência, deve ser enviado um email de notificação tanto para o cpf_issuer
// como para o cpf_recipient

export default class TransactionsController {
  public async store({auth, request, response}: HttpContextContract) {
    const {cpf_issuer, cpf_recipient} = await request.validate(StoreValidator)

    try{
      await VerifyCpfsInput(cpf_issuer, cpf_recipient, response, auth)
    } catch(error){
      return response.badRequest({message: error.message})
    }

    
    return response.ok({cpf_issuer, cpf_recipient})
  }

}
