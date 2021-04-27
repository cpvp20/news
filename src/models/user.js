const Database = require('./database');

class User extends Database{
    constructor(){
        console.log('User model...')
        super('users');
    }

}

module.exports = new User();