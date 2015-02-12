module.exports = function(server) {
    /**
     * Fonctionnalité n°8 : Demander un emprunt à une personne du réseau
     *
     * Paramètres body : {elementId=100}
     */
    server.post('/user/:id/borrow', server.middleware.isLoggedIn, function(req, res) {
        if (req.body.elementId == undefined || req.body.elementId == null) {
            res.send(500, err.toString());

            return;
        }

        var OtherUser = {};

        OtherUser.id = req.body.id;
        Element.id   = req.body.elementId;
        MyUser.id    = req.session.userId;

        // Cherche l'utilisateur à qui la demande est adressée
        server.models.User.findOne({id: OtherUser.id}, function(err, data) {
            if (err) {
                res.send(500, err.toString());

                return;
            }
            else {
                OtherUser = data;

                if (OtherUser) {
                    // Cherche l'élément pour lequel la demande d'emprunt est faite
                    server.models.Element.findOne({id: Element.id}, function(err, data) {
                        if (err) {
                            res.send(500, err.toString());

                            return;
                        }
                        else {
                            Element = data;

                            if (Element) {
                                console.log('Creating a borrow with OtherUser.id = ' + OtherUser.id + ', OwnerId = ' + Owner.id +
                                    ' and Element.id = ' + Element.id);
                                var newBorrow = {};

                                newBorrow.ElementId = Element.id;
                                newBorrow.UserId    = OtherUser.id;
                                newBorrow.OwnerId   = MyUser.id;

                                var newBorrow = server.models.Borrow(newBorrow);

                                newBorrow.save(function(err, borrow) {
                                    if (err) {
                                        res.send(500, err.toString());
                                    }
                                    else {
                                        res.send(borrow.toJSON());
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });
};
