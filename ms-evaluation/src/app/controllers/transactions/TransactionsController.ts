import {Request, Response} from 'express'
import StoreTransactionBodyMandatoryData from '../../utils/StoreTransactionBodyMandatoryData'
import TransactionValidator from '../../validators/TransactionValidator'

export default class TransactionsController{
    async handleTransaction(request: Request, response: Response){
        const inputErrors = StoreTransactionBodyMandatoryData(request)
        if (inputErrors.length > 0) return response.status(400).json(inputErrors)

        const resultValidator = await TransactionValidator(request)

        if(resultValidator instanceof Error) return response.status(400).json(resultValidator.message)

        return response.json({message: 'passou tranquilo'})

    }
}