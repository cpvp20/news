const { User } = require('./../models');


class UsersController {

    getAll(req, res) {
        User.find({}, (err, results) => {
            if (err) {
                console.log('Error fetching users');
                return;
            };
            res.send(results);
        });
    }

    getById(req, res) {
        let id = req.params.id;
        collection.findOne({ 'id': id }).toArray((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(results);
        });
    }


    async createUser(req, res) {
        const { username, email, password } = req.body;
        if (!req.file) { res.end('File not supported'); return; }
     
        User.insertOne(req.body, (err, result) => {
            if (err) {
                res.end('User not created. Something went wrong');
                return;
            };
            res.end('User successfully created');
        })

    }

    userrender(req, res) {
        console.log('query params' + req.query);
        res.render('indexx', {
            title: 'App'
        });
    }
}

module.exports = new UsersController();
