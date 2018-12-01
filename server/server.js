const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const nextStopRouter = require('./routes/nextStop.router');

//check that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/nextStopRouter', nextStopRouter);



