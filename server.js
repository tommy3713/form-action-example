import Fastify from 'fastify'
import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import path from 'path'

import { fileURLToPath } from 'url';
import fs from 'fs'
const fastify = Fastify()
const __dirname = path.dirname(fileURLToPath(import.meta.url));
await fastify.register(cors, { 
  // put your options here
})
await fastify.register(formbody)

// Declare a route
fastify.post('/data', async (request, reply) => {
  // You can access the request body using request.body
  const { data } = request.body;
  
  // Do something with the data
  console.log(data);

  // Reply with a message
  return { message: 'Data received successfully!', receivedData: data };
});

fastify.post('/get-image', async (request, reply) => {
    const imagePath = path.join(__dirname, 'image.png');
    
    try {
        const stats = fs.statSync(imagePath);
        console.log(`File size: ${stats.size} bytes`);
        
        // Log the attempt to send the file with its size
        console.log(`Attempting to send stream for file size: ${stats.size} bytes`);

        // Set headers for content disposition to trigger download
        reply.header('Content-Disposition', 'attachment; filename="downloaded-image.png"');
        
        const stream = fs.createReadStream(imagePath);
        stream.on('open', () => console.log('Stream opened.'));
        stream.on('data', (chunk) => console.log(`Received ${chunk.length} bytes of data.`));
        stream.on('end', () => console.log('Stream ended.'));
        stream.on('error', (error) => {
            console.error('Error streaming the file:', error);
            reply.send(error); // Proper error handling
        });

        return reply.type('image/png').send(stream);
    } catch (error) {
        console.error('Error accessing file:', error);
        reply.code(500).send('Internal Server Error');
    }
});
// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
