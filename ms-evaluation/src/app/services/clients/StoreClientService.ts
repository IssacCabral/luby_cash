import { Client } from "../../models/Client";
import dataSource from "../../../database/data-source";

interface IClientBodyRequest{
    full_name: string,
    email: string,
    phone: string,
    cpf: string,
    current_balance: number,
    average_salary: number,
    status: string
}

interface IAddressBodyRequest{
    street: string,
    city: string,
    state: string,
    zip_code: string
}

export default class StoreClientService{
    async execute({full_name, email, phone, cpf, current_balance, average_salary, status}: IClientBodyRequest, {}: IAddressBodyRequest){

    }
}