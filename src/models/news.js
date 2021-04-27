const Database = require('./database');

class News extends Database{
    constructor(){
        console.log('news model...')
        super('news');
    }

}

module.exports = new News();