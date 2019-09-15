const fastify = require('fastify')({
    logger: true
})

const mongoose = require('mongoose')

const routes = require('./routes')

mongoose.connect('mongodb://localhost/mycargarage')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

fastify.get('/', async(request, reply) => {
    return {hello: 'World'}
})

const start = async() => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${ fastify.server.address().port }`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

routes.forEach((route, index) => {
    fastify.route(route)
})

start()