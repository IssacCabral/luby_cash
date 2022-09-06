import Producer from '../Producer'

interface RecipientInfo {
    full_name: string,
    issuer_name: string
    email: string,
    transfer_value: number
}

export async function sendRecipientTransactionEmail({ full_name,issuer_name, email, transfer_value }: RecipientInfo) {
    const producer = new Producer()

    await producer.connect()

    await producer.sendMessage([{
        value: JSON.stringify({
            full_name: full_name,
            issuer_name: issuer_name,
            email: email,
            transfer_value: transfer_value
        })
    }], 'recipient-transaction-email')

    await producer.disconnect()
}