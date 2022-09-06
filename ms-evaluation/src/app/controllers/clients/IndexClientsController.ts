import { Request, Response } from "express";
import dataSource from "../../../database/data-source";
import { Client } from "../../models/Client";
import { Address } from "../../models/Address";

export class IndexClientsController{
    async index(request: Request, response: Response){
        const {page, per_page, status} = request.query

        const clientRepository = dataSource.getRepository(Client)
        const addressRespository = dataSource.getRepository(Address)        

        const clients = await clientRepository.find()
        const addresses = await addressRespository.find({relations: {client: true}})

        return response.json({addresses})
    }
}