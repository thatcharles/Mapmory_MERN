const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://admin-001:admin@cluster0-ydvgx.mongodb.net/test?retryWrites=true&w=majority'

const connect = mongoose.connect(process.env.MONGODB_URI || mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected Successfully...'))
  .catch(err => console.log(err))

app.use(cors())

// to not get any deprecation warning or error
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))
// to get json data
// support parsing of application/json type post data
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/users', require('./routes/users'))
app.use('/api/blog', require('./routes/blog'))

// use this to show the image you have in node js server to client (react js)
// https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'))

// Serve static assets if in production

/***************************************
 * Comment out when editing locally
 ***************************************/
app.use(express.static('client/build'))

// index.html for all page routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
})
/****************************************/

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port)
})

// sudo ln -s /etc/nginx/sites-available/Mapmory_MERN /etc/nginx/sites-enabled/Mapmory_MERN
