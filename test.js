require('dotenv').config();
const express = require('express');
const connection = require("./config/databases");
const routers = require('./config/routers');

var app = express();
// var http = require('http');
// const server = http.createServer(app);
// server.listen(5000);
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use('/Images', express.static('Images'));
app.use(routers);

app.get("/api", (req, res) => {
    res.json({
        success : 1,
        message : "API Is Working"
    })
});

app.get('/', (req, res) => {
    res.send("<h1>Home Page....</h1>")
});

app.listen(process.env.APP_PORT, () => {
    console.log('Server Has Been Connected On Port ' + process.env.APP_PORT + '.....');
});