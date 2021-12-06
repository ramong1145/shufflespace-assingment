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

app.listen(PORT, () => {
    console.log(`API is running on port localhost:${PORT}`)
})