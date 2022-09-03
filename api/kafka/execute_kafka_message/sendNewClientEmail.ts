import Producer from '../Producer'

interface INewClientInfo {
    full_name: string,
    email: string
}

export async function sendNewClientEmail({ full_name, email }: INewClientInfo) {
    const producer = new Producer()

    await producer.connect()

    await producer.sendMessage([{
        value: JSON.stringify({
            full_name: full_name,
            email: email
        })
    }], 'new-client-email')

    await producer.disconnect()
}