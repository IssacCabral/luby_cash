import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'api',
    brokers: ["kafka1:9091"]
})

export default kafka