const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/teslar.duckdns.org/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/teslar.duckdns.org/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/teslar.duckdns.org/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use((req, res) => {
    res.send('Hello there !');
});

// Starting both http & https servers
const httpsServer = https.createServer(credentials, app);


httpsServer.listen(3000, () => {
    console.log('HTTPS Server running on port 443');
});
