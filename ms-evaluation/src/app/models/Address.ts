import {Entity, Column, CreateDateColumn, UpdateDateColumn,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'

import { Client } from './Client'

@Entity('addresses')
export class Address{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    zip_code: string

    @Column()
    client_id: number

    @ManyToOne(() => Client)
    @JoinColumn({name: 'client_id'})
    client: Client

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}