import {Consumer as KafkaConsumer, Message, CompressionTypes} from 'kafkajs'

import kafka from './kafka-config'

import SendNewClientEmail from '../handle-consumer/SendNewClientEmail'
import SendDesaprovedClientEmail from '../handle-consumer/SendDesaprovedClientEmail'
import SendRememberTokenEmail from '../handle-consumer/SendRememberTokenEmail'

export default class Consumer{
    public consumer: KafkaConsumer

    constructor(){
        this.consumer = kafka.consumer({groupId: 'test-group'})
    }

    async connect(){
        await this.consumer.connect()
    }

    async disconnect(){
        await this.consumer.disconnect()
    }

    async subscribe(topics: Array<string>){
        await this.consumer.subscribe({topics, fromBeginning: true})
    }

    async run(){
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(topic)

                switch(topic){
                    case 'new-client-email':
                        new SendNewClientEmail().sendEmail(message, 'Welcome To Luby Cash', 'send_new_client_email.ejs')
                        break
                    case 'desaproved-client-email':
                        new SendDesaprovedClientEmail().sendEmail(message, 'Sorry for the Inconvenience', 'send_desaproved_client_email.ejs')
                        break    
                    case 'remember-token-email':
                        new SendRememberTokenEmail().sendEmail(message, 'Recover Your password', 'send_remember_token_email.ejs')
                        break   
                    default:
                        console.log('nao passei em nenhum')     
                }
            },
          })
    }
}
