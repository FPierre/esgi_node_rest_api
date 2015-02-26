module.exports = function(server) {
    /**
     * Fonctionnalité n°8 : Demander un emprunt à une personne du réseau
     *
     * Paramètres body : {elementId=100}
     */
    server.post('/user/:id/borrows', server.middleware.isLoggedIn, function(req, res) {
        if (req.body.elementId == undefined) {
            res.send(500, {errorMessage: 'No elementId'});

            return;
        }

        var User      = {};
        var OwnerUser = {};
        var Element   = {};

        User._id      = req.session.userId;
        OwnerUser._id = req.params.id;
        Element._id   = req.body.elementId;

        // Si l'utilisateur qui demande est celui qui reçoit la demande d'emprunt
        if (User._id == OwnerUser._id) {
            res.send(400, {errorMessage: 'Same users requested'});

            return;
        }

        // Cherche l'utilisateur à qui la demande est adressée
        server.models.User.findOne({_id: OwnerUser._id}, function(err, data) {
            if (err) {
                res.send(500, {errorMessage: 'Oops, something wrong with the server'});

                return;
            }
            else {
                OwnerUser = data;

                if (OwnerUser._id == undefined) {
                    res.send(400, {errorMessage: 'No user found'});

                    return;
                }

                // Cherche l'élément pour lequel la demande d'emprunt est faite
                server.models.Element.findOne({_id: Element._id}, function(err, data) {
                    if (err) {
                        res.send(500, {errorMessage: 'Oops, something wrong with the server'});

                        return;
                    }
                    else {
                        Element = data;

                        if (Element._id != undefined) {
                            console.log('Creating a borrow with OwnerUser._id = ' + OwnerUser._id + ', User._id = ' + User._id +
                                ' and Element.id = ' + Element._id);
                            var newBorrow = {};

                            newBorrow.ElementId = Element._id;
                            newBorrow.UserId    = User._id;
                            newBorrow.OwnerId   = OwnerUser._id;
                            newBorrow.Status    = 'requesting';

                            var newBorrow = server.models.Borrow(newBorrow);

                            newBorrow.save(function(err, borrow) {
                                if (err) {
                                    res.send(500, {errorMessage: 'Oops, something wrong with the server'});
                                }
                                else {
                                    res.send(200, borrow.toJSON());
                                }
                            });
                        }
                    }
                });
            }
        });
    });
};
