import { Request, Response } from "express";

import StoreClientBodyMandatoryData from "../../utils/StoreClientBodyMandatoryData";
import StoreClientService from "../../services/clients/StoreClientService";

export class StoreClientController {
    async store(request: Request, response: Response) {
        const errors = StoreClientBodyMandatoryData(request)

        if (errors.length > 0) return response.status(400).json(errors)

        const service = new StoreClientService()
        const result = await service.execute(request, request.body['cpf'])

        return result instanceof Error ? response.status(400).json(result.message) : response.status(201).json(result)
    }
}