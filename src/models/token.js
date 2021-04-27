

const Database = require('./database');

class Token extends Database{
    constructor(){
        console.log('Token model...')
        super('user');
        //this.useCollection('Tokens');
    }

}

module.exports = new Token();