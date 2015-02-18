module.exports = function(server) {
    /**
     * Pour récupérer _id d'un borrow
     * TODO: à supprimer
     */
    server.get('/borrows', server.middleware.isLoggedIn, function(req, res) {
        server.models.Borrow.find({}, function(err, data) {
            if (err) {
                // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                //res.send(500, err.toString());
                res.send(500,{errorMessage:"Oops Something wrong with the server"});
                return;
            }
            else {
                // Renvoyer data non?
                console.log(data);
                res.send('200');
            }
        });
    });
}
