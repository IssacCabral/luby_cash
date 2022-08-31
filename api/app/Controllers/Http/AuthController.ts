import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()

    const user = await User.query().where('email', email).preload('roles').first()

    console.log(Env.get('NODE_ENV'))

    try {
      const token = await auth.use('api').attempt(email, password, {
        name: user?.fullName,
        expiresIn: Env.get('NODE_ENV') === 'development' ? '' : '30mins',
        
      })

      return { token, user }
    } catch (error) {
      return response.unauthorized({ message: 'Invalid credentials', originalError: error.message })
    }
  }

}
