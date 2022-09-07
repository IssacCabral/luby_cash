import { Request, Response } from "express";
import { Like } from "typeorm";
import dataSource from "../../../database/data-source";
import { Client } from "../../models/Client";
import { Between } from "typeorm";

import fromToDate from "../../utils/fromToDate";

export class IndexClientsController {
    async index(request: Request, response: Response) {
        const { page, per_page, status, noPaginate, from, to } = request.query

        const clientRepository = dataSource.getRepository(Client)

        console.log(`page: ${typeof page}, per_page: ${typeof per_page}, status: ${typeof status}, noPaginate: ${typeof noPaginate}, from: ${typeof from} to: ${typeof to}`)

        let clients: Client[]

        // casos em que não queremos paginar
        if (noPaginate == "true") {
            
            // caso em que queremos filtrar apenas pelo status
            if (status != "undefined" && from == "undefined") {
                clients = await clientRepository.find({
                    where: { status: String(status) },
                    relations: { address: true }
                })
                return response.status(200).json({ clients })
            }

            // caso em que queremos filtrar apenas pelo intervalo de data
            if (status == "undefined" && from != "undefined") {
                const { fromDate, toDate } = fromToDate(String(from), String(to))

                clients = await clientRepository.find({
                    where: {
                        created_at: Between(
                            new Date(fromDate[0], fromDate[1], fromDate[2]),
                            new Date(toDate[0], toDate[1], toDate[2])
                        )
                    },
                    relations: { address: true }
                })
                return response.status(200).json({ clients })
            }
            
            // caso em que queremos filtrar tanto pelo status quanto pelo intervalo de data
            if (status != "undefined" && from != "undefined" ) {
                const { fromDate, toDate } = fromToDate(String(from), String(to))
                console.log('to aqui agora')
                clients = await clientRepository.find({
                    where: {
                        created_at: Between(
                            new Date(fromDate[0], fromDate[1], fromDate[2]),
                            new Date(toDate[0], toDate[1], toDate[2])
                        ),
                        status: String(status)
                    },
                    relations: { address: true }
                })
                return response.status(200).json({ clients })
            }

            
            // caso em que queremos retornar tudo
            return response.status(200).json({ clients: await clientRepository.find() })
        }


        /* CASOS EM QUE QUEREMOS PAGINAÇÃO */

        // caso em que queremos filtrar apenas pelo status
        if (status != "undefined" && from == "undefined") {
            clients = await clientRepository.find({
                where: { status: String(status) },
                relations: { address: true },
                take: Number(per_page) || 4,
                skip: (Number(page) - 1) * Number(per_page) || 0
            })
            return response.status(200).json({ clients })
        }

        // caso em que queremos filtrar apenas pelo intervalo de data
        if (status == "undefined" && from !== "undefined") {
            const { fromDate, toDate } = fromToDate(String(from), String(to))

            clients = await clientRepository.find({
                where: {
                    created_at: Between(
                        new Date(fromDate[0], fromDate[1], fromDate[2]),
                        new Date(toDate[0], toDate[1], toDate[2])
                    )
                },
                take: Number(per_page) || 4,
                skip: (Number(page) - 1) * Number(per_page) || 0
            })
            return response.status(200).json({ clients })
        }

        // caso em que queremos filtrar tanto pelo status quanto pelo intervalo de data
        if (status !== "undefined" && from !== "undefined") {
            const { fromDate, toDate } = fromToDate(String(from), String(to))

            clients = await clientRepository.find({
                where: {
                    created_at: Between(
                        new Date(fromDate[0], fromDate[1], fromDate[2]),
                        new Date(toDate[0], toDate[1], toDate[2])
                    ),
                    status: String(status)
                },
                take: Number(per_page) || 4,
                skip: (Number(page) - 1) * Number(per_page) || 0
            })
            return response.status(200).json({ clients })
        }

        // caso em que retornamos sem qualquer condição, porém páginado
        return response.status(200).json({
            clients: await clientRepository.find({
                take: Number(per_page) || 4,
                skip: (Number(page) - 1) * Number(per_page) || 0
            })
        })

    }
}