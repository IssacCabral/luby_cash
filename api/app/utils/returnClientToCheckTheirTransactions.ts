import User from "App/Models/User";


export default async function returnClientToCheckTheirTransactions(clientCpf: string): Promise<User | Error> {
    const client = await User.findByOrFail('cpf', clientCpf)
    const clientRole = await client.related('roles').query()

    clientRole.forEach(role => {
        if (role.name == 'admin') throw new Error('invalid cpf. you should only fetch clients')
    })

    return client
}