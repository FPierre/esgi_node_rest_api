/**
 * Created by Save92 on 12/02/15.
 */
module.exports = function(server) {
    server.get('/borrows/:type',server.middleware.isLoggedIn, function(req, res) {
        // On récupère notre id
        var userId = req.session.userId;
        var params = {};
        params.owner_id = userId;
        params.type = req.params.type;
        if(params.type === "lending") {
            // Si la donnée est différente de null
            params.LendDate = {$exists: true};
        } else {
            // Si la donnée est égale à null
            params.LendDate = null;
        }
        // On lance la recherche
        server.models.Borrow.find(params,handleQueryResponse);

        function handleQueryResponse(err,data)
        {
            if(err)
            {
                // erreur
                res.send(500, err.toString());
                return;
            }
            else {
                // 200
                res.send(data);
            }
        }
    });
};