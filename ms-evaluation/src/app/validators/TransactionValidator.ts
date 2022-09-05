import {Request, Response} from 'express'
import { Client } from '../models/Client'
import dataSource from '../../database/data-source'

export default async function TransactionValidator(request: Request){
    const clientRepository = dataSource.getRepository(Client)
    const {cpf_issuer, cpf_recipient, transfer_value} = request.body

    if(transfer_value <= 0) return new Error('transfer_value can not be negative or equal to zero')

    const findIssuerByCpf = await clientRepository.findOne({where: {cpf: cpf_issuer}})

    if(!findIssuerByCpf) return new Error('issuer client does not exists')
    if(findIssuerByCpf && findIssuerByCpf.status !== 'approved') return new Error('issuer client not approved')
    if(findIssuerByCpf && findIssuerByCpf.current_balance < transfer_value) return new Error('insufficient current balance')

    const findRecipientByCpf = await clientRepository.findOne({where: {cpf: cpf_recipient}})

    if(!findRecipientByCpf) return new Error('recipient client does not exists')
    if(findRecipientByCpf && findRecipientByCpf.status !== 'approved') return new Error('recipient client not approved')

}