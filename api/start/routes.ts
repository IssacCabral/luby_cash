import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

// test health connection
Route.get('/healthy', async ({ response }: HttpContextContract) => {
  await Database.report().then(({ health }) => {
    const { healthy, message } = health

    if (healthy) return response.ok({ message })

    return response.status(500).json({ message })
  })
})

// public routes
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/clients', 'ClientsController.store')

  Route.post('/forgot-password', 'ForgotsPasswordsController.store')
  Route.put('/recovery-password', 'ForgotsPasswordsController.updatePassword')

}).prefix('luby-cash')

// admin routes
Route.group(() => {
  Route.resource('/admins', 'AdminsController').except(['create', 'edit'])

  Route.get('/clients', 'AdminsController.findAllClients')
  Route.get('/transactions/:clientCpf', 'TransactionsController.index').where('clientCpf', /^\d{3}.\d{3}.\d{3}-\d{2}$/)
})
  .prefix('luby-cash')
  .middleware(['auth', 'is:admin'])

// transactions routes
Route.group(() => {
  Route.post('/transactions', 'TransactionsController.store')
})  
  .prefix('luby-cash')
  .middleware(['auth', 'is:client'])