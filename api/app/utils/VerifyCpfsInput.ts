import { ResponseContract } from '@ioc:Adonis/Core/Response';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';

import User from "App/Models/User"

export default async function VerifyCpfsInput(cpf_issuer: string, cpf_recipient: string, response: ResponseContract, auth: AuthContract){
    if(cpf_issuer !== auth.user!.cpf) throw new Error ('authenticated user must be cpf equal to cpf_issuer')
    if(cpf_issuer === cpf_recipient) throw new Error ('it is not possible to make a transaction with yourself')
        
    const issuer = await User.query().where('cpf', cpf_issuer).preload('roles').first()
    const recipient = await User.query().where('cpf', cpf_recipient).preload('roles').first()

    issuer!.roles.forEach((role) => {
        if(role.name === 'admin') throw new Error('only clients can make transactions. check issuer cpf')
    })

    recipient!.roles.forEach((role) => {
        console.log(role.name)
        if(role.name === 'admin') throw new Error('only clients can make transactions. check recipient cpf')
    })

    console.log('to aqui??')

} 