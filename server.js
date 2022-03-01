const express = require('express');
const { static } = express;
const app = express();
const path = require('path');

app.use('/dist', static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

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

const Sequelize = require('sequelize');
const {STRING} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const User = conn.define('user', {
    name: STRING
});
const syncAndSeed = async() => {
    await conn.sync({ force: true });
    await Promise.all([
        User.create({ name: 'moe' }),
        User.create({ name: 'larry' }),
        User.create({ name: 'lucy' })
    ])
}
init();