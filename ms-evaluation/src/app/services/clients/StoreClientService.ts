import { Request } from "express-serve-static-core";
import { Client } from "../../models/Client";
import { Address } from "../../models/Address";
import dataSource from "../../../database/data-source";
import fillClientBeforeCreate from "../../utils/fillClientBeforeCreate";
import fillAddressBeforeCreate from "../../utils/fillAddressBeforeCreate";


export default class StoreClientService {
    async execute(request: Request ,cpf: string): Promise<Client | Error> {
        const clientRepository = dataSource.getRepository(Client)
        const addressRepository = dataSource.getRepository(Address)

        const clientExists = await clientRepository.findOne({ where: { cpf } })

        if (clientExists) return new Error('Client already exists')

        const client = fillClientBeforeCreate(request)

        await clientRepository.save(client)

        const address = fillAddressBeforeCreate(request, client.id)

        await addressRepository.save(address)

        return client
    }
}