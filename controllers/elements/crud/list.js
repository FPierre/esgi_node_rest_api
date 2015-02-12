/**
 * Created by thierryallardsaintalbin on 12/02/15.
 */


module.exports = function(server) {
    server.get('/elements', server.middleware.isLoggedIn, function (req, res) {

        server.models.Element.find({}, handleQueryResponse);

        function handleQueryResponse(err, data) {
            if (err) {
                res.send(500, err.toString());
                return;
            }
            else {
                server.totalElements = data;
                res.send(server.totalElements);
            }
            // res.send(elements);
        }

    });
}