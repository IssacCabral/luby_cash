import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    // create admin user
    const searchKeyAdmin = {email: 'admin@email.com'}
    const userAdmin = await User.updateOrCreate(searchKeyAdmin, {
      fullName: 'Admin',
      email: 'admin@email.com',
      password: 'secret',
      cpf: '000.000.000-00',
    }) 

    const roleAdmin = await Role.findBy('name', 'admin')
    if(roleAdmin) await userAdmin.related('roles').attach([roleAdmin.id]) 

    // create client user
    const searchKeyClient = {email: 'client@email.com'}
    const userClient = await User.updateOrCreate(searchKeyClient, {
      fullName: 'Client',
      email: 'client@email.com',
      password: 'secret',
      cpf: '000.000.000-01',
    }) 

    const roleClient = await Role.findBy('name', 'client')
    if(roleClient) await userClient.related('roles').attach([roleClient.id]) 
  }
}
