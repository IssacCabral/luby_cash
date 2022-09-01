import {Entity, Column, CreateDateColumn, UpdateDateColumn,PrimaryColumn, OneToMany} from 'typeorm'

import { Address } from './Address'

@Entity('clients')
export class Client{
    @PrimaryColumn()
    id: number

    @Column()
    full_name: string

    @Column()
    email: string

    @Column()
    fone: string

    @Column()
    cpf: string

    @Column()
    current_balance: number

    @Column()
    average_salary: number

    @Column()
    status: string

    @OneToMany(() => Address, (address) => address.client)
    addresses: Address[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}