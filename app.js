const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/authRoutes')
const challengeRoutes = require('./routes/challengeRoutes')
const checkinRoutes = require('./routes/checkinRoutes')
const projectRoutes = require('./routes/projectRoutes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/checkins', checkinRoutes)
app.use('/api/projects', projectRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to the productivity app')
})

module.exports = app