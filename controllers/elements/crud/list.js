/**
 * Created by thierryallardsaintalbin on 12/02/15.
 */


module.exports = function(server) {
    server.get('/elements', server.middleware.isLoggedIn, function (req, res) {

        server.models.Element.find({}, handleQueryResponse);

        function handleQueryResponse(err, data) {
            if (err) {
                // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                //res.send(500, err.toString());
                res.send(500,{errorMessage:"Oops Something wrong with the server"});
                return;
            }
            else {
                server.totalElements = data;
                //200 ?
                res.send(server.totalElements);
            }
            // res.send(elements);
        }

    });
}