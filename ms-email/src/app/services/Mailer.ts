import { Message as KafkaMessage} from 'kafkajs';
import { Transporter } from 'nodemailer'

import transporter_config from '../config/transporter_config';

export default abstract class Mailer{
    protected transporter: Transporter

    constructor(){
        this.transporter = transporter_config
    }

    abstract sendEmail(message: KafkaMessage, subject: string, fileName: string): Promise<void>
}
