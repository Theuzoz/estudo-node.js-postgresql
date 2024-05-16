// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//     //console.log('server on!')
//     response.write('ola')
//     return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/3
// Route Parameter

// GET, POST, PUT e DELETE
server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body
    
    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    const search = request.query.search

    const videos = database.list(search)
    
    return videos
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333
})

