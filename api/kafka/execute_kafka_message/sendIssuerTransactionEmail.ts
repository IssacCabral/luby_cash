import Producer from '../Producer'

interface IssuerInfo {
    full_name: string,
    recipient_name: string
    email: string,
    transfer_value: number
}

export async function sendIssuerTransactionEmail({ full_name, recipient_name, email, transfer_value }: IssuerInfo) {
    const producer = new Producer()

    await producer.connect()

    await producer.sendMessage([{
        value: JSON.stringify({
            full_name: full_name,
            recipient_name: recipient_name,
            email: email,
            transfer_value: transfer_value
        })
    }], 'issuer-transaction-email')

    await producer.disconnect()
}