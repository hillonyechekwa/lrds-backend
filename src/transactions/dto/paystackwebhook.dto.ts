

export type PaystackWebhookDto = {
    event: string
    data: Data;
}


export type Data = {
    id?: number;
    domain?: string;
    status?: string;
    reference?: string;
    amounnt?: number

    gateway_respone?: string
    paid_at?: string
    created_at?: string
    channel?: string
    currency?: string
    ip_address?: string
    metadata?: any

    message?: any
    fees: any;
    log: any
    customer: any
    authorization: any
    plan: any
}



export enum PaymentStatus {
    paid = "paid",
    notPaid = "not paid"
}