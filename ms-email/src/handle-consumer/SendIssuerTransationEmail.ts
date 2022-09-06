import {Message as KafkaMessage} from 'kafkajs'
import Mailer from '../app/services/Mailer'

import ejs from 'ejs'
import env from '../app/config/env'

class SendIssuerTransactionEmail extends Mailer{
    constructor(){
        super()
    }

    async sendEmail(message: KafkaMessage, subject: string, fileName: string): Promise<void> {
        const messageToJSON = JSON.parse(String(message.value))
        
        const data = await ejs.renderFile('/app/src/views/' + fileName, {
            full_name: messageToJSON.full_name,
            recipient_name: messageToJSON.recipient_name,
            email: messageToJSON.email,
            transfer_value: messageToJSON.transfer_value
        })

        await this.transporter.sendMail({
            from: String(env.SMTP_FROM),
            to: messageToJSON.email,
            subject,
            html: data
        })

        console.log('a new email ' + subject + ' has been sent to ' + messageToJSON.full_name)
    }

}

export default SendIssuerTransactionEmail