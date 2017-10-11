var express = require('express');
var app = express();


app.use('/:timestamp', (req, res) => {
	var timestamp = req.params.timestamp;
	var naturalTime; 
	var unixTime;

	if (/^[0-9]+$/.test(timestamp)) { // check whether input is integers without spaces/letters
		unixTime = Number.parseInt(timestamp, 10); // timestamp is a String and needs conversion
		naturalTime = getNaturalTime(unixTime * 1000); // pass the unix time in _milliseconds_
	} else {
		naturalTime = getNaturalTime(timestamp);
		unixTime = getUnixTime(timestamp);
	}

	if (isNaN(unixTime)) { // invalid user input; set values to null
		naturalTime = null;
		unixTime = null;
	}

	res.send({unix: unixTime, natural: naturalTime});
});

app.use('/', (req, res) => {
	res.sendFile(__dirname+'/index.html');
});

app.listen(3000, ()=> {
	console.log('Listening on port 3000');
});

function getNaturalTime(unixTime) {
	var date = new Date(unixTime);
	var options = {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}; // formatting for .toLocaleString()

	return date.toLocaleString('en-US', options);
}

function getUnixTime(naturalTime) {
	var date = new Date(naturalTime);
	// extract the date's elements in preparation for Date.UTC();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();

	return Date.UTC(year, month, day)/1000; // Date.UTC() gives answer in milliseconds, hence the division to get seconds.
}