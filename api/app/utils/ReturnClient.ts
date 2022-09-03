import User from "App/Models/User";

export async function ReturnClientAfterCreate(cpf: string): Promise<User | null>{
    return await User.query().where('cpf', cpf).preload('roles').firstOrFail()
}