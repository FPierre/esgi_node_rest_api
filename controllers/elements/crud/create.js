/**
 * Created by thierryallardsaintalbin on 12/02/15.
 */

module.exports = function(server) {
    server.post('/elements', server.middleware.isLoggedIn, function (req, res) {

        MyNewElements = {};
        MyNewElements.name = req.body.name;
        MyNewElements.type = req.body.type;
        MyNewElements.description = req.body.description
        MyNewElements.idOwner = req.session.userId;


        MyNewElements = new server.models.Element(MyNewElements);
        MyNewElements.save(onElementCreated);


        function onElementCreated(err, MyNewElements) {
            if (err) {
                // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                //res.send(500, err.toString());
                res.send(500,{errorMessage:"Oops Something wrong with the server"});
                return;
            }
            else {
                server.totalElements.push(MyNewElements);
                res.send(200, MyNewElements.toJSON());
            }
        }

    });

}