import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import ResetPasswordValidator from 'App/Validators/Forgot-Password/ResetPasswordValidator'
import RecoveryPasswordValidator from 'App/Validators/Forgot-Password/RecoveryPasswordValidator'

import crypto from 'crypto'
import { DateTime } from 'luxon'
import sendRememberTokenEmail from '../../../kafka/execute_kafka_message/sendRememberTokenEmail'

import moment from 'moment'

import {ValidationException} from '@ioc:Adonis/Core/Validator'

export default class ForgotsPasswordsController {
  public async store({request, response}: HttpContextContract) {
    const {email} = await request.validate(ResetPasswordValidator)
    const user = await User.findBy('email', email)

    const rememberMeToken = crypto.randomBytes(12).toString('hex')

    user!.rememberMeToken = rememberMeToken
    user!.rememberMeTokenCreatedAt = DateTime.now()

    await user!.save()

    try{ 
      // kafka message
      await sendRememberTokenEmail({full_name: user!.fullName, email: user!.email, rememberMeToken: user!.rememberMeToken})
    } catch(error){
      return response.badRequest({ message: 'error in send recovery email', originalError: error.message })
    }

    return response.ok({message: 'check your email input to find the token'})
  }

  public async updatePassword({request, response}: HttpContextContract) {
    const {token, password} = await request.validate(RecoveryPasswordValidator)
    const user = await User.findBy('remember_me_token', token)

    const tokenExpired = moment().subtract('2', 'days').isAfter(user!.rememberMeTokenCreatedAt)

    if(tokenExpired) throw new ValidationException(false, 'token expired')

    user!.rememberMeToken = null
    user!.rememberMeTokenCreatedAt = null

    user!.password = password

    await user!.save()
    
    return response.ok({message: 'password updated successfully!'})
  }

}
