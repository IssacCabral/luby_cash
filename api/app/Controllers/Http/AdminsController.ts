import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Role from 'App/Models/Role'

import StoreValidator from 'App/Validators/Admin/StoreValidator'
import UpdateValidator from 'App/Validators/Admin/UpdateValidator'

import { ReturnAdminAfterCreate, ReturnAdminAfterUpdate } from 'App/utils/ReturnAdmins'
import axios from 'axios'

export default class AdminsController {
  public async index({ request, response }: HttpContextContract) {
    const { page, per_page, noPaginate, ...inputs } = request.qs()

    if (noPaginate) {
      return await User.query()
        .whereHas('roles', (rolesQuery) => {
          rolesQuery.where('name', 'admin')
        })
        .preload('roles')
        .filter(inputs)
    }

    try {
      const admins = await User.query()
        .whereHas('roles', (rolesQuery) => {
          rolesQuery.where('name', 'admin')
        })
        .preload('roles')
        .filter(inputs)
        .paginate(page || 1, per_page || 4)

      return response.ok({ admins })
    } catch (error) {
      return response.badRequest({ message: 'error in list admins', originalError: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const adminBody = await request.validate(StoreValidator)

    const admin = new User()

    try {
      admin.fill(adminBody)

      await admin.save()

      const adminRole = await Role.findByOrFail('name', 'admin')

      if (adminRole) {
        await admin.related('roles').attach([adminRole.id])
      }

      return response.created({ adminCreated: await ReturnAdminAfterCreate(admin.cpf) })
    } catch (error) {
      return response.badRequest({ message: 'error in create admin', originalError: error.message })
    }

  }

  public async show({ response, params }: HttpContextContract) {
    const adminId = params.id

    try {
      const admin = await User.query()
        .where('id', adminId)
        .whereHas('roles', (rolesQuery) => {
          rolesQuery.where('name', 'admin')
        })
        .preload('roles')
        .firstOrFail()

      return response.ok(admin)
    } catch (error) {
      return response.notFound({ message: 'admin not found', originalError: error.message })
    }

  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const bodyUpdate = await request.validate(UpdateValidator)
    const adminId = params.id

    let admin = new User()

    try {
      const checkId = auth.user?.id == adminId

      if (!checkId) {
        return response.forbidden({ message: 'You don/\t have permissions to update other user' })
      }

      admin = await User.findByOrFail('id', adminId)

      await admin.merge(bodyUpdate).save()

      return response.ok({ adminUpdated: await ReturnAdminAfterUpdate(admin.id) })
    } catch (error) {
      return response.badRequest({ message: 'error in update user', originalError: error.message })
    }

  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    const adminId = params.id
    const userLoggedId = auth.user!.id

    if (adminId === userLoggedId) return response.badRequest({ message: "you can't delete yourself" })

    try {
      await User.query().delete().where('id', adminId)

      return response.ok({ message: 'user successfull deleted' })
    } catch (error) {
      return response.notFound({ message: 'user not found', originalError: error.message })
    }
  }

  public async findAllClients({request, response}: HttpContextContract) {
    const {page, per_page, status, noPaginate, from, to} = request.qs()

    try{
      const res = await axios.get(
        `http://evaluation:3334/clients?noPaginate=${noPaginate}&page=${page}&per_page=${per_page}&status=${status}&from=${from}&to=${to}`
        )
        
      return response.ok({data: res.data})
    } catch(error){
      return response.badRequest({ error: error?.response?.data })
    }
  }

}
