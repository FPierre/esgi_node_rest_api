module.exports = function(server) {
    /**
     * Pour récupérer _id d'un borrow
     * TODO: à supprimer
     */
    server.get('/borrows', server.middleware.isLoggedIn, function(req, res) {
        server.models.Borrow.find({}, function(err, data) {
            if (err) {
                res.send(500, err.toString());
                return;
            }
            else {
                console.log(data);
                res.send('200');
            }
        });
    });
}
