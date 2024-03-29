import { Request } from "express";

import { Client } from "../models/Client";
import { Address } from "../models/Address";
import dataSource from "../../database/data-source";

export default function fillClientBeforeCreate(request: Request, address: Address): Client {
    const { full_name, email, phone, cpf, average_salary } = request.body
    
    const clientRepository = dataSource.getRepository(Client)

    if(average_salary < 500){
        const client = clientRepository.create({
            full_name, email, phone, cpf, average_salary,
            status: 'desaproved', current_balance: null, address
        })
        return client
    }else{
        const client = clientRepository.create({
            full_name, email, phone, cpf, average_salary,
            status: 'approved', current_balance: 200, address
        })
        return client
    }

}