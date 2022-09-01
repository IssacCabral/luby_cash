import { Request } from "express";

import { Address } from "../models/Address";
import dataSource from "../../database/data-source";

export default function fillAddressBeforeCreate(request: Request, client_id: number): Address{
    const { street, city, state, zip_code } = request.body['address']

    const addressRepository = dataSource.getRepository(Address)

    const address = addressRepository.create({
        client_id, street, city, state, zip_code
    })

    return address
}