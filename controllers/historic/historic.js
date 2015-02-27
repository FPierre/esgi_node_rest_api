/**
 * Created by Save92 on 12/02/15.
 */
module.exports = function(server) {
    server.get('/borrows/:type',server.middleware.isLoggedIn, function(req, res) {
        // On récupère notre id
        var userId = req.session.userId;
        console.log("userId");
        console.log(userId);
        var type = req.params.type;
        var params = {};
        params.UserId = userId;
        if(type === "lending") {
            console.log("lending");
            // Si la donnée est différente de null
            params.LendDate = {$exists: true};
            params.Status = "closed";
        } else {
            console.log("borrowing");
            // Si la donnée est égale à null
            params.Status = "validated";
            params.LendDate = null;
        }
        console.log(params);
        // On lance la recherche
        server.models.Borrow.find(params,handleQueryResponse);

        function handleQueryResponse(err,data)
        {
            console.log("data");
            console.log(data);
            if(err)
            {
                // erreur
                // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                //res.send(500, err.toString());
                res.send(500,{errorMessage:"Oops Something wrong with the server"});
                return;
            }
            else {
                // 200
                res.send(200,data);
            }
        }
    });
};