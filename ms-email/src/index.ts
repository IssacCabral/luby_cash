import Consumer from "./kafka/Consumer"

(async () => {
    const topics = [
        'new-client-email',
        'desaproved-client-email',
        'remember-token-email'
    ]

    const consumer = new Consumer()

    await consumer.connect()

    await consumer.subscribe(topics)

    await consumer.run()

})()