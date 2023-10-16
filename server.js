const express = require('express');
const { processAllTariffSchemes } = require('./index.js');
const app = express();
const port = process.env.PORT || 7777;

app.get('/processTariffSchemes', async (req, res) => {
    try {
        const dataObject = await processAllTariffSchemes();
        console.log(dataObject);
        res.status(200).send(dataObject);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});