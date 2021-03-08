const Database = require('./database');

class News extends Database{
    constructor(){
        console.log('news model...')
        super();
        this.useCollection('news');

    }

}

module.exports = new News();