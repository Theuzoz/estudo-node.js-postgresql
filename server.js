// import { createServer } from 'node:http';
// const server = createServer((request, response) => {
//     //console.log('server on!')
//     response.write('ola')
//     return response.end()
// })
// server.listen(3333)

import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/3
// Route Parameter

// GET, POST, PUT e DELETE
// com async e await por ser um banco de dados online
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body
    
    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)
    
    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

// variavel ou porta local
server.listen({
    port: process.env.PORT ?? 3333,
})

