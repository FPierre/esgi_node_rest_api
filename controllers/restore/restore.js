/**
 * Created by Save92 on 12/02/15.
 */
module.exports = function(server) {
    server.post('/borrows/:id/restore',server.middleware.isLoggedIn, function(req, res) {
        var borrowId;
        var borrow;
        // On récupère l'emprunt concerné
        borrowId = req.params.id;
        console.log(borrowId);
        if (borrowId) {
            // On récupère l'emprunt concerné via son id
            server.models.Borrow.findById(borrowId,handleQueryResponse);

            function handleQueryResponse(err,data)
            {
                if(err)
                {
                    // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                    //res.send(500, err.toString());
                    res.send(500,{errorMessage:"Oops Something wrong with the server"} + err);
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
                            // message génériqu
                            // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                            //res.send(500, err.toString());
                            res.send(500, {errorMessage: "Oops Something wrong with the server"});
                            return;
                        }
                        else {
                            // 200
                            res.send(200, myBorrow.toJSON());
                        }
                    }
                }
            }
        }
    });
    server.put('/borrows/:id/restore/:action',server.middleware.isLoggedIn, function(req, res) {
        var Borrow = {};
        var borrow;
        var choice;
        var myUserId = req.session.userId;
        console.log("myUserId");
        console.log(myUserId);
        // On récupère l'emprunt concerné
        // On recupere l'action a effectuer
        Borrow._id = req.params.id;
        console.log("borrowId");
        console.log(Borrow._id);
        choice = req.params.action;
        if (Borrow._id) {

            // On recupere notre emprunt par son id
            server.models.Borrow.findOne({_id: Borrow._id},handleQueryResponsePut);
            function handleQueryResponsePut(err,data)
            {
                if(err)
                {
                    // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                    //res.send(500, err.toString());
                    res.send(500,{errorMessage:"Oops Something wrong with the server"});
                    return;
                }
                else {
                    borrow = data;
                    console.log("BORROW DATA : ");
                    console.log(borrow);
                    if(borrow.OwnerId != myUserId) {
                        res.send(400, {errorMessage: 'User not allowed to access to this borrow'});
                        return;
                    }
                    // On test selon si l'action est valid ou invalid le status de l'emprunt correspondant
                    if (choice == "valid") {
                        borrow.Status = "closed";
                        var date = Date.now();
                        borrow.LendDate = date;
                    } else if(choice == "invalid") {
                        borrow.Status = "borrowing";
                    } else {
                        res.send(400, "Bad action");
                        return;
                    }
                    //borrow.Status = choice == "valid" ? "closed" : "borrowing";
                    // On sauvegarde l'emprunt modifié
                    borrow.save(onBorrowUpdated);
                    function onBorrowUpdated(err, myBorrow) {
                        if (err) {
                            // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                            //res.send(500, err.toString());
                            res.send(500,{errorMessage:"Oops Something wrong with the server"});
                            return;
                        }
                        else {
                            // 200
                            res.send(200, myBorrow.toJSON());
                        }
                    }
                }
            }
        }
    });
};