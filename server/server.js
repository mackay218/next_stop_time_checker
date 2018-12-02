const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nextStopRouter = require('./routes/nextStop.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/nextStopRouter', nextStopRouter);


// express static file serving - public is the folder name
app.use(express.static('server/public'));

const port = process.env.PORT || 5000;

//check that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
