import { Request, Response } from "express";
import { Client } from "../models/Client";
import dataSource from "../../database/data-source";
import StoreClientBodyMandatoryData from "../utils/StoreClientBodyMandatoryData";

export default async function ClientStoreValidator(request: Request, response: Response) {
    const clientRepository = dataSource.getRepository(Client)

    const findClientByFullName = await clientRepository.findOne({where: {full_name: request.body['full_name']}})
    const findClientByEmail = await clientRepository.findOne({where: {email: request.body['email']}}) 
    const findClientByCpf = await clientRepository.findOne({ where: { cpf: request.body['cpf'] } })

    if (findClientByFullName){
        return findClientByFullName.status === 'approved' ? new Error('client already exists, name duplicate') : new Error('client desaproved, name duplicate')
    }
    if (findClientByEmail){
        return findClientByEmail.status === 'approved' ? new Error('client already exists, email duplicate') : new Error('client desaproved, email duplicate')
    }
    if (findClientByCpf){
        return findClientByCpf.status === 'approved' ? new Error('client already exists, cpf duplicate') : new Error('client desaproved, cpf duplicate')
    }


}