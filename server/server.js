const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const nextStopRouter = require('./routes/nextStop.router');

//check that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/nextStopRouter', nextStopRouter);



