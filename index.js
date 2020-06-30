const express = require('express');

const projectRouter = require('./projects/projectRouter.js');
const actionRouter = require('./actions/actionRouter.js');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);///api/projects/:id/actions

server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my Sprint Challenge</h1>');
})



server.listen(5000, () => {
    console.log(`server listening on port 5000`);
})
