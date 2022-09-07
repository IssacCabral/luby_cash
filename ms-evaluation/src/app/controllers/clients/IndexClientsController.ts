import { Request, Response } from "express";
import dataSource from "../../../database/data-source";
import { Client } from "../../models/Client";

export class IndexClientsController{
    async index(request: Request, response: Response){
        const {page, per_page, status, noPaginate} = request.query

        const clientRepository = dataSource.getRepository(Client)       

        let clients: Client[]

        if(noPaginate !== "undefined"){
            clients = await clientRepository.find()
            return response.json({allClients: clients})
        }

        if(status == "undefined"){
            clients = await clientRepository.find({
                relations: {address: true},
                take: Number(per_page) || 4,
                skip: (Number(page) - 1) * Number(per_page) || 0
            })
            return response.json({clients})
        }

        if(status !== "undefined"){
            clients = await clientRepository.find({
                where: {status: String(status)},
                relations: {address: true},
                take: Number(per_page) || 4,
                skip: (Number(page) - 1) * Number(per_page) || 0
            })
            return response.json({clients})
        }

        

    }
}