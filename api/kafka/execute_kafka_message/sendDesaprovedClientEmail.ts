import Producer from '../Producer'

interface IDesaprovedClientInfo {
    full_name: string,
    email: string
}

export async function sendDesaprovedClientEmail({ full_name, email }: IDesaprovedClientInfo) {
    const producer = new Producer()

    await producer.connect()

    await producer.sendMessage([{
        value: JSON.stringify({
            full_name: full_name,
            email: email
        })
    }], 'desaproved-client-email')

    await producer.disconnect()
}