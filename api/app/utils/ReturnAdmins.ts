import User from "App/Models/User";

export async function ReturnAdminAfterCreate(cpf: string): Promise<User | null>{
    return await User.query().where('cpf', cpf).preload('roles').firstOrFail()
}

export async function ReturnAdminAfterUpdate(id: number): Promise<User | null>{
    return await User.query().where('id', id).preload('roles').firstOrFail()
}