module.exports = function(req, res, next) {

    Token.findByToken(req.headers.authorization).then(response => {
        if(response) {
            console.log();
            next();
        } else {
            res.status(401).send();
        }
    }).catch(err => {
        res.status(401).send();
    })

    next();
    //The 401 Unauthorized Error is an HTTP response status code indicating that the request 
    //sent by the client could not be authenticated.
}