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

}).prefix('luby-cash')

// admin routes
Route.group(() => {
  Route.resource('/admins', 'AdminsController').except(['create', 'edit'])
})
  .prefix('luby-cash')
  .middleware(['auth', 'is:admin'])