// require('dotenv').config();
// const express = require('express');
const https =  require('https')

const payStack = async (req, res) => {
    // res.send('hello paystack')
    try {
        //request body from client
        // request body from the clients
        const email = req.body.email;
        const amount = req.body.amount;
        // params
        const params = JSON.stringify({
            "email": email,
            "amount": amount * 100
        })

        // options
        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
                Authorization:`Bearer ${process.env.PUBLIC_KEY}`,'Content-Type': 'application/json'
            }
        }
        //client request to paystack API
        const clientRequest = https.request(options, apiResponse => {
            let data = ''
            apiResponse.on('data', (chunk) => {
                data += chunk
            })
            apiResponse.on('end', () => {
                // console.log(data);
                console.log(JSON.parse(data));
                return res.status(200).json(JSON.parse(data));
            })
        }).on('error', error => {
            console.error(error);
        res.status(500).json({ msg: error });
        })
        clientRequest.write(params)
        clientRequest.end()

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = payStack