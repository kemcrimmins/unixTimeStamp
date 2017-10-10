var express = require('express');
var app = express();


app.use('/:timestamp', (req, res) => {
	var timestamp = req.params.timestamp;
	var naturalTime; 
	var unixTime;

	if (timestamp.indexOf(' ') === -1) {
		unixTime = Number.parseInt(timestamp, 10);
		naturalTime = getNaturalTime(unixTime * 1000);
	} else {
		naturalTime = timestamp;
		unixTime = getUnixTime(timestamp);
	}

	if (isNaN(unixTime)) {
		naturalTime = null;
		unixTime = null;
	}
	res.send('<p>natural time: ' + naturalTime + '<p>unix time: '+unixTime); 
});

app.use('/', (req, res) => {
	res.send('Hello world');
});

app.listen(3000, ()=> {
	console.log('Listening on port 3000');
});

function getNaturalTime(unixTime) {
	var date = new Date(unixTime);
	var options = {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'};

	return date.toLocaleString('en-US', options);
}

function getUnixTime(naturalTime) {
	var date = new Date(naturalTime);
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();

	return Date.UTC(year, month, day)/1000;
}