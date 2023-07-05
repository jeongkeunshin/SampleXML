const express = require('express');
const app = express();

app.get('/', function(requirest, response) {
	response.sendFile('index.html');
});
