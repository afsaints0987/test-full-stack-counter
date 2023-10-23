const express = require('express')
const cors = require('cors')
const port = 5500
const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

let counter = 0;

const counterValue = async (req, res) => {
    res.json(counter)
}

app.get('/', counterValue)

app.post('/count', (req, res) => {
    counter++;
    res.json(counter)
})


app.listen(port, () => {console.log(`Server is listening to port ${port}`)})