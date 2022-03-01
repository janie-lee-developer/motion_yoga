//db
const { syncAndSeed, models: {User}} = require('./db/index')

//express
const express = require('express');
const { static } = express;
const app = express();

//path for static files
const path = require('path');

//webpack
app.use('/dist', static(path.join(__dirname, '../dist')));

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