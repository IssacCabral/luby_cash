import { Request, Response } from "express";

import StoreClientBodyMandatoryData from "../../utils/StoreClientBodyMandatoryData";
import StoreClientService from "../../services/clients/StoreClientService";

import ClientStoreValidator from "../../validators/ClientStoreValidator";

export class StoreClientController {
    async store(request: Request, response: Response) {
        const inputErrors = StoreClientBodyMandatoryData(request)
        if (inputErrors.length > 0) return response.status(400).json(inputErrors)
        
        const resultValidator = await ClientStoreValidator(request, response)

        if(resultValidator instanceof Error) return response.status(400).json(resultValidator.message)

        const service = new StoreClientService()
        const result = await service.execute(request)

        return result instanceof Error ? response.status(400).json(result.message) : response.status(201).json(result)
    }
}