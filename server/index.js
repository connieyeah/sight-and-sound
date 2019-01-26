/* eslint-disable no-console */
const express = require('express');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('./client/dist'));
app.use(bodyparser.json());

app.post('/create', (req, res) => {
  res.send(JSON.stringify(req.body));
});

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
