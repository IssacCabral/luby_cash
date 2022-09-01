import {Entity, Column, CreateDateColumn, UpdateDateColumn,PrimaryGeneratedColumn, OneToMany} from 'typeorm'

@Entity('clients')
export class Client{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    full_name: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    cpf: string

    @Column()
    current_balance: number

    @Column()
    average_salary: number

    @Column()
    status: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}