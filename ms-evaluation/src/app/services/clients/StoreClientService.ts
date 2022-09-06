import { Request } from "express-serve-static-core";
import { Client } from "../../models/Client";
import { Address } from "../../models/Address";
import dataSource from "../../../database/data-source";
import fillClientBeforeCreate from "../../utils/fillClientBeforeCreate";
import fillAddressBeforeCreate from "../../utils/fillAddressBeforeCreate";


export default class StoreClientService {
    async execute(request: Request): Promise<Client> {
        const clientRepository = dataSource.getRepository(Client)
        const addressRepository = dataSource.getRepository(Address)

        const address = fillAddressBeforeCreate(request)
        await addressRepository.save(address)

        const client = fillClientBeforeCreate(request, address)
        await clientRepository.save(client)

        return client
    }
}