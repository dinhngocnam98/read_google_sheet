const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const readGGSheetRouter = require('./routers/readGGSheetRouter');

const app = express();


app.use(express.json());
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use('/read', readGGSheetRouter);
const server = http.createServer(app);
server.listen(3000);