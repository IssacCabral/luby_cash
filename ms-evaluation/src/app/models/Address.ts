import {Entity, Column, CreateDateColumn, UpdateDateColumn,PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm'

import { Client } from './Client'

@Entity('addresses')
export class Address{
    @PrimaryColumn()
    id: number

    @Column()
    client_id: number

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    zip_code: string

    @ManyToOne(() => Client, (client) => client.addresses)
    client: Client

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}