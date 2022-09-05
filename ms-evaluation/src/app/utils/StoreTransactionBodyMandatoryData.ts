import {Request} from 'express'

interface MandatoryData{
    field: string,
    message: string
}

export default function StoreTransactionBodyMandatoryData(request: Request): Array<MandatoryData>{
    const mandatoryData = ["cpf_issuer", "cpf_recipient", "transfer_value"]

    const errors: Array<MandatoryData> = []

    mandatoryData.forEach(element => {
        const value = request.body[element]
        if(!value){
            errors.push({
                field: element,
                message: `O campo ${element} é obrigatório`
            })
        }
    })

    return errors
}