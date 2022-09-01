import { Request, Response } from "express";
import dataSource from "../../../database/data-source";

import { Client } from "../../models/Client";
import { Address } from "../../models/Address";

import StoreClientBodyMandatoryData from "../../utils/StoreClientBodyMandatoryData";

import fillClientBeforeCreate from "../../utils/fillClientBeforeCreate";
import fillAddressBeforeCreate from "../../utils/fillAddressBeforeCreate";

export class StoreClientController{
    async store(request: Request, response: Response){
        const errors = StoreClientBodyMandatoryData(request)

        if(errors.length > 0) return response.status(400).json(errors)

        const clientRepository = dataSource.getRepository(Client)
        const addressRepository = dataSource.getRepository(Address)

        try{
            const client = fillClientBeforeCreate(request)
            
            await clientRepository.save(client)
            
            const address = fillAddressBeforeCreate(request, client.id)

            await addressRepository.save(address)

            return response.status(201).json(client)
        } catch(error){
            return response.status(400).json({error: 'error in store a new client', originalError: error.message})
        }

    }
}