import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    const searchKeyAdmin = {email: 'admin@email.com'}
    const userAdmin = await User.updateOrCreate(searchKeyAdmin, {
      fullName: 'Admin',
      email: 'admin@email.com',
      password: 'secret',
      cpf: '000.000.000-00',
    }) 

    const roleAdmin = await Role.findBy('name', 'admin')
    if(roleAdmin) await userAdmin.related('roles').attach([roleAdmin.id]) 
  }
}
