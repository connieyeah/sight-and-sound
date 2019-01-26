/* eslint-disable no-console */
const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('./client/dist'));

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
