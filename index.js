const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
server.listen(5000, () => {
    console.log('server listening on 5000')
})
