import User from "App/Models/User";
import Role from 'App/Models/Role'

interface IClientBodyRequest{
    full_name: string;
    email: string;
    password: string;
    cpf: string;
}

export default async function CreateApprovedClient({full_name, email, password, cpf}: IClientBodyRequest): Promise<User> {
    const client = new User()

    client.fill({
        fullName: full_name,
        email: email,
        password: password,
        cpf: cpf,

    })

    await client.save()

    const clientRole = await Role.findByOrFail('name', 'client')

    if (clientRole) {
        await client.related('roles').attach([clientRole.id])
    }

    return client
}