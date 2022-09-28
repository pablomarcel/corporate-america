require('dotenv').config()
//const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const phraseRoutes = require('./routes/phrases')
const userRoutes = require('./routes/user')
const { errorHandler } = require('./middleware/errorMiddleware');

// express server
const server = express()

// middleware
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(errorHandler);

server.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes

//server.use(routes);
server.use('/api/phrases', phraseRoutes)
server.use('/api/user', userRoutes)

// if (process.env.NODE_ENV != 'test') {
//     connectDB();
// }

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    server.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    server.use(express.static(path.join(__dirname, '../frontend/build')));

    server.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    server.get('/', (req, res) => res.send('Please set to production'));
}

module.exports = server;


