//db
const { syncAndSeed, models: {User}} = require('./db/index')

//express
const express = require('express');
const { static } = express;
const app = express();

//path for static files
const path = require('path');

//webpack static files route
// app.use('/dist', static(path.join(__dirname, '../dist')));
// automatically made public folder/ bundle.js by adding output prop in webpack.config.js file.
// remove the dist/main.js folder.
// update static path for webpack to be /public instead of /dist
app.use('/public', static(path.join(__dirname, '../public')));

//routes
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));

app.get('/api/users', async(req, res, next) => {
    try {
        res.send( await User.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

const init = async() => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`listening on port ${port}`));
    } 
    catch(ex) {
        console.log(ex);
    }
}

init();