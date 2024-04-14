require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

const router = require('./routes/routes')

app.use(bodyParser.json());
app.use('/',router)


const port = process.env.PORT || 3000

const start = () => {
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}...`);
    })
}

start()