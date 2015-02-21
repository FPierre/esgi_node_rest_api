module.exports = function(server) {
    /**
     * Fonctionnalité n°9 : Accepter une demande d'emprunt
     * Fonctionnalité n°10 : Refuser une demande d'emprunt
     *
     * Paramètres body : vide
     */
    server.put('/borrows/:borrowId/request/:action', server.middleware.isLoggedIn, function(req, res) {
        if (req.params.borrowId == undefined || req.params.action == undefined) {
            res.send(500, {errorMessage: 'Oops something wrong with the server'});

            return;
        }

        var Borrow = {};

        Borrow._id = req.params.borrowId;

        var action = req.params.action;

        // Cherche l'emprunt pour lequel la demande est faite
        server.models.Borrow.findOne({_id: Borrow._id}, function(err, data) {
            if (err) {
                res.send(500, {errorMessage: 'Oops something wrong with the server'});

                return;
            }
            else {
                Borrow = data;

                if (Borrow._id != undefined) {
                    switch (action) {
                        case 'validated':
                            Borrow.Status = 'validated';
                            break;
                        case 'refused':
                            Borrow.Status = 'refused';
                            break;
                        default:
                            console.log('Action ' + action + ' is not allowed to modified a borrow status.');
                            res.send(403, {errorMessage: 'Action ' + action + ' is not allowed'});

                            return;
                    }

                    Borrow.save(function(err, borrow) {
                        if (err) {
                            res.send(500, {errorMessage: 'Oops something wrong with the server'});
                        }
                        else {
                            res.send(200, borrow.toJSON());
                        }
                    });
                }
            }
        });
    });
};
