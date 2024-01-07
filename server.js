const express = require('express');
const { processAllTariffSchemes } = require('./function.js');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7777;

app.get('/', async (req, res) => {
    res.send('El bot de tarifas funciona.');
});

app.use(cors());

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});