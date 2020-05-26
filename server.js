
const express = require('express')
const characterRouter = require('./controllers/character')
const tierRouter = require('./controllers/tier')
const moveRouter = require('./controllers/move')
const app = express()


app.use(express.urlencoded({extended: true}))

app.use(express.json())


app.use(express.static(`${__dirname}/client/build`))

app.use('/api/character', characterRouter)
app.use('/api/tier', tierRouter)
app.use('/api', moveRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
