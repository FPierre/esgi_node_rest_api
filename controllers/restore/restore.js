/**
 * Created by Save92 on 12/02/15.
 */
var restore = [];

module.exports = function(server) {
    server.post('/borrows/:id/restore',server.middleware.isLoggedIn, function(req, res) {
        var borrowId;
        var borrow;

        // On récupère l'emprunt concerné
        borrowId = req.params.id;
        if (borrowId) {
            // On récupère l'emprunt concerné via son id
            server.models.Borrow.findById(borrowId,handleQueryResponse);

            function handleQueryResponse(err,data)
            {
                if(err)
                {
                    res.send(500, err.toString());
                    return;
                }
                else {
                    borrow = data;
                    // on change le statut de l'emprunt a restoring
                    borrow.Status = "restoring";
                    // On sauvegarde l'objet modifié
                    borrow.save(onBorrowUpdated);

                    function onBorrowUpdated(err, myBorrow) {
                        if (err) {
                            res.send(500, err.toString());
                            return;
                        }
                        else {
                            res.send(myBorrow.toJSON());
                        }
                    }
                }
            }
        }
    });
    server.post('/borrows/:id/restore/:action',server.middleware.isLoggedIn, function(req, res) {
        var borrowId;
        var borrow;
        var choice;

        // On récupère l'emprunt concerné
        borrowId = req.params.id;
        // On recupere l'action a effectuer
        action = req.params.action;
        if (borrowId) {
            // On recupere notre emprunt par son id
            server.models.Borrow.findById(borrowId,handleQueryResponse);

            function handleQueryResponse(err,data)
            {
                if(err)
                {
                    res.send(500, err.toString());
                    return;
                }
                else {
                    borrow = data;
                    // On test selon si l'action est valid ou invalid le status de l'emprunt correspondant
                    borrow.Status = action == "valid" ? "closed" : "borrowing";
                    // On sauvegarde l'emprunt modifié
                    borrow.save(onBorrowUpdated);
                    function onBorrowUpdated(err, myBorrow) {
                        if (err) {
                            res.send(500, err.toString());
                            return;
                        }
                        else {
                            res.send(myBorrow.toJSON());
                        }
                    }
                }
            }
        }
    });
};