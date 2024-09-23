import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {PaymentStatus} from "../transactions/dto/paystackwebhook.dto"


@Entity({name: 'transactions'})
export class Transaction{
    @PrimaryGeneratedColumn({name: 'id'})
    id:number

    @Column({name: 'transaction_reference', nullable: true})
    transactionReference: string

    @Column({name: 'payment_link', nullable: true})
    paymentLink: string

    @Column({name: 'transaction_status', nullable: true})
    transactionStatus: string

    @Column({name: 'status', default: PaymentStatus.notPaid})
    status: PaymentStatus

    @Column({name: 'booking_id'})
    bookingId: number;
}