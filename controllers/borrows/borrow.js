module.exports = function(server) {
    /**
     * Fonctionnalité n°9 : Accepter une demande d'emprunt
     * Fonctionnalité n°10 : Refuser une demande d'emprunt
     *
     * Paramètres body : vide
     */
    server.put('/user/:userId/borrows/:borrowId/request/:action', server.middleware.isLoggedIn, function(req, res) {
        if (req.params.userId == undefined || req.params.borrowId == undefined || req.params.action == undefined) {
            res.send(500, err.toString());

            return;
        }

        var OtherUser = {};
        var Borrow    = {};

        OtherUser.id = req.params.userId;
        Borrow.id    = req.params.borrowId;

        var action = req.params.action;

        // Cherche l'utilisateur à qui la demande est adressée
        server.models.User.findOne({id: OtherUser.id}, function(err, data) {
            if (err) {
                res.send(500, err.toString());

                return;
            }
            else {
                OtherUser = data;

                if (OtherUser) {
                    // Cherche l'emprunt pour lequel la demande est faite
                    server.models.Borrow.findOne({id: Borrow.id}, function(err, data) {
                        if (err) {
                            res.send(500, err.toString());

                            return;
                        }
                        else {
                            Borrow = data;

                            if (Borrow) {
                                switch (action) {
                                    case 'validated':
                                        Borrow.Status = 'validated';
                                        break;
                                    case 'refused':
                                        Borrow.Status = 'refused';
                                        break;
                                    default:
                                        console.log('Action ' + action + ' is not allowed to modified a borrow status.');
                                        res.send(500, err.toString());

                                        return;

                                }

                                Borrow.save(function(err, borrow) {
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
