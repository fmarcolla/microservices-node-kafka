import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();
const message = {
    user: { id: 1, name: 'Felipe Marcolla'},
    course: 'Kafka com node.js',
    grade: 5
};

routes.post('/certifications', async (req, res) => {
    // Envia mensagem para microserviço
    await req.producer.send({
        topic: 'issue-certificate',
        compression: CompressionTypes.GZIP,
        messages: [
          { value: JSON.stringify(message) },
        ],
    });
    console.log(req.producer);
    return res.json({ ok: true});
});

export default routes;