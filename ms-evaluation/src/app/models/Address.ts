import {Entity, Column, CreateDateColumn, UpdateDateColumn,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'

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

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}