/**
 * Created by thierryallardsaintalbin on 12/02/15.
 */
module.exports = function(server) {
    server.delete('/elements/:id', server.middleware.isLoggedIn, function (req, res) {
        var count = 0;


        MyNewElements = {};
        MyNewElements._id = req.params.id;
        MyNewElements.idOwner = req.session.userId;
        MyNewElements = new server.models.Element(MyNewElements);

        server.models.Element.findOneAndRemove({
            _id: MyNewElements._id,
            idOwner: MyNewElements.idOwner
        }, onElementRemoved);

        function onElementRemoved(err, data) {
            if (err) {
                // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                //res.send(500, err.toString());
                res.send(500,{errorMessage:"Oops Something wrong with the server"});
                return;
            }
            else {
                server.totalElements = server.totalElements.filter(function (element) {
                    if (element != req.params.id) {
                        return true;
                    }
                    else {
                        count++;

                        return false;
                    }
                });
                res.send(202, server.totalElements);
                return;
            }
        }
    });
}