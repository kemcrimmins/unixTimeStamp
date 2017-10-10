var express = require('express');
var app = express();


app.use('/:timestamp', (req, res) => {
	var timestamp = req.params.timestamp;
	var naturalTime = new Date(timestamp);
	res.send(naturalTime);
	// console.log(timestamp);
	// res.send(timestamp);
});

app.use('/', (req, res) => {
	res.send('Hello world');
});

app.listen(3000, ()=> {
	console.log('Listening on port 3000');
});