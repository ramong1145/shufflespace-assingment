const express = require('express');
const cors = require('cors');
const { app_port } = require('../config');

const app = express();
const PORT = app_port || 5002;

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.use((req, res) => {
    res.statusCode = 500;
    res.send({
        StatusCode: res.statusCode,
        Message: 'Select a valid endpoint'
    })
})

app.listen(PORT, () => {
    console.log(`API is running on port localhost:${PORT}`)
})