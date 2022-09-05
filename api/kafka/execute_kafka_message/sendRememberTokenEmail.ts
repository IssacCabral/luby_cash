import Producer from '../Producer'

interface ITokenEmailInfo{
    full_name: string,
    email: string,
    rememberMeToken: string
}

export default async function sendRememberTokenEmail({full_name, email, rememberMeToken}: ITokenEmailInfo){
    const producer = new Producer()

    await producer.connect()

    await producer.sendMessage([{
        value: JSON.stringify({
            full_name,
            email,
            rememberMeToken
        })
    }], 'remember-token-email')

    await producer.disconnect()
}