import { Request } from "express";

import { Address } from "../models/Address";
import dataSource from "../../database/data-source";

export default function fillAddressBeforeCreate(request: Request): Address{
    const { street, city, state, zip_code } = request.body['address']

    const addressRepository = dataSource.getRepository(Address)

    const address = addressRepository.create({
        street, city, state, zip_code
    })

    return address
}