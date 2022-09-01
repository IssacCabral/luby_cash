import {Request} from 'express'

interface MandatoryData{
    field: string,
    message: string
}

export default function StoreClientBodyMandatoryData(request: Request): Array<MandatoryData>{
    const mandatoryData = [
        "full_name", "email", "phone", "cpf", "average_salary","address"
    ]

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