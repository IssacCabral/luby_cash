import { Request, Response } from "express";
import dataSource from "../../../database/data-source";
import { Client } from "../../models/Client";

export class IndexClientsController{
    async index(request: Request, response: Response){
        const {page, per_page, status} = request.query

        const clientRepository = dataSource.getRepository(Client)       

        const clients = await clientRepository.find({relations: {address: true}})

        return response.json({clients})
    }
}