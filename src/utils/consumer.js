import { Kafka } from "kafkajs";
import { Lokomotif } from "../models/lokomotifSchema.js";

const kafka = new Kafka({
    clientId: 'lokomotif-data',
    brokers: ['127.0.0.1:9092', '127.0.0.1:9092']
})

const consumer = kafka.consumer({ groupId: 'loko-group' });

export const run = async () => {

    await consumer.connect();
    await consumer.subscribe({ topic: 'lokomotifdata', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const parsedMessage = JSON.parse(message.value.toString());

            const data = new Lokomotif({
                kodeLoko: parsedMessage.kodeLoko,
                namaLoko: parsedMessage.namaLoko,
                dimensiLoko: parsedMessage.dimensiLoko,
                status: parsedMessage.status,
                createdDate: parsedMessage.createdDate
            })

            try {
                await data.save();
                console.log("THIS IS DATA", data);
            } catch (error) {
                console.log(error);
            }
        }
    })

}