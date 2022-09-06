import { Request, Response } from "express";
import { Client } from "../../models/Client";
import dataSource from "../../../database/data-source";

export default class TransactionsService{
    async execute(request: Request){
        const clientRepository = dataSource.getRepository(Client)
        const {cpf_issuer, cpf_recipient} = request.body
        let transfer_value = Number(request.body['transfer_value'])

        let issuer = await clientRepository.findOne({where: {cpf: cpf_issuer}})
        const recipient = await clientRepository.findOne({where: {cpf: cpf_recipient}})
        
        const issuer_current_balance = Number(issuer.current_balance) - Number(transfer_value)
        const recipient_current_balance = Number(recipient.current_balance) + Number(transfer_value)
        
        await clientRepository.update(issuer.id, {current_balance: Number(issuer_current_balance)})
        await clientRepository.update(recipient.id, {current_balance: Number(recipient_current_balance)})

        let issuerUpdated = await clientRepository.findOne({where: {cpf: cpf_issuer}})
        const recipientUpdated = await clientRepository.findOne({where: {cpf: cpf_recipient}})

        return {issuerUpdated, recipientUpdated}
    }
}