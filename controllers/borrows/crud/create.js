module.exports = function(server) {
    /**
     * Fonctionnalité n°8 : Demander un emprunt à une personne du réseau
     *
     * Paramètres body : {elementId=100}
     */
    server.post('/user/:id/borrows', server.middleware.isLoggedIn, function(req, res) {
        if (req.body.elementId == undefined) {
            res.send(500, err.toString());

            return;
        }

        var OtherUser = {};
        var Element   = {};
        var Owner     = {};

        OtherUser._id = req.params.id;
        Element._id   = req.body.elementId;
        Owner._id     = req.session.userId;

        // Cherche l'utilisateur à qui la demande est adressée
        server.models.User.findOne({_id: OtherUser._id}, function(err, data) {
            if (err) {
                res.send(500, err.toString());

                return;
            }
            else {
                OtherUser = data;

                if (OtherUser._id != undefined) {
                    // Cherche l'élément pour lequel la demande d'emprunt est faite
                    server.models.Element.findOne({_id: Element._id}, function(err, data) {
                        if (err) {
                            res.send(500, err.toString());

                            return;
                        }
                        else {
                            Element = data;

                            if (Element._id != undefined) {
                                console.log('Creating a borrow with OtherUser._id = ' + OtherUser._id + ', OwnerId = ' + Owner._id +
                                    ' and Element.id = ' + Element._id);
                                var newBorrow = {};

                                newBorrow.ElementId = Element._id;
                                newBorrow.UserId    = OtherUser._id;
                                newBorrow.OwnerId   = Owner._id;

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
                else {
                    res.send(500, 'No user found');

                    return;
                }
            }
        });
    });
};
