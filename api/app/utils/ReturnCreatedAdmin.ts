import User from "App/Models/User";

export default async function ReturnCreatedAdmin(cpf: string): Promise<User | null>{
    return await User.query().where('cpf', cpf).preload('roles').firstOrFail()
}