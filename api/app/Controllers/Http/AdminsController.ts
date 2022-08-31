import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Role from 'App/Models/Role'

import StoreValidator from 'App/Validators/User/StoreValidator'

import ReturnCreatedAdmin from 'App/utils/ReturnCreatedAdmin'

export default class AdminsController {
  public async index({}: HttpContextContract) {

  }

  public async store({request, response}: HttpContextContract) {
    const adminBody = await request.validate(StoreValidator)

    const admin = new User()

    try{
      admin.fill(adminBody)

      await admin.save()

      const adminRole = await Role.findByOrFail('name', 'admin')

      if(adminRole){
        await admin.related('roles').attach([adminRole.id])
      }

      return response.created({admin: await ReturnCreatedAdmin(admin.cpf)})
    } catch(error){
      return response.badRequest({message: 'error in create admin', originalError: error.message})
    }

  } 

  // public async show({request, response}: HttpContextContract) {
    

  //   //return response.json(result)

  // }

  public async update({}: HttpContextContract) {

  }

  public async destroy({}: HttpContextContract) {

  }
}
