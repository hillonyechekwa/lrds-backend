

export type PaystackCreateTransactionDto = {
    amount: number
    email: string
    callback_url?: string
    metadata: PaystackMetadata
}

export type PaystackMetadata = {
    user_id: number;
    booking_id: number;
    callback_url?: string
    custom_fields: PaystackMetadataCustomField[]
}

export type PaystackVerifyTransactionResponseDto = {
    status: boolean
    message: string
    data: {
        status: string
        reference: string
    }
}

export type PaystackMetadataCustomField = {
    display_name: string
    variable_name: string
    value: string | number
}

export type PaystackCreateTransactionResponseDto = {
    status: boolean
    message: string
    data: {
        authorization_url: string
        access_code: string
        reference: string
    }
}


//TODO: add data shape for subaccount creation and split payments

