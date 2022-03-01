const conn = require('./conn');
const { STRING } = conn.Sequelize;


const User = conn.define('user', {
    name: STRING
}); 

module.exports = User;