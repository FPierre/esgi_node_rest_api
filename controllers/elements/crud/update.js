/**
 * Created by thierryallardsaintalbin on 12/02/15.
 */


module.exports = function(server) {
    server.put('/elements/:id', server.middleware.isLoggedIn,function(req, res) {


        MyNewElements = {};
        MyNewElements._id = req.params.id;
        MyNewElements.idOwner = req.session.userId;
        MyNewElements.name = req.body.name;
        MyNewElements.type = req.body.type;
        MyNewElements.description = req.body.description;


        MyNewElements = new server.models.Element(MyNewElements);
        server.models.Element.findOneAndUpdate( {_id : MyNewElements._id , idOwner : MyNewElements.idOwner},
            { name : MyNewElements.name,type : MyNewElements.type, description : MyNewElements.description} ,
            onElementModified);

        function onElementModified(err,data) {
            if (err) {
                // mauvaise pratique d'envoyer l'erreur comme cela il faut le remplacer par un message générique
                //res.send(500, err.toString());

                res.send(500,{errorMessage:"Oops Something wrong with the server"});
                return;
            }
            else {

                if(data)
                {
                    console.log(data);
                    server.totalElements = server.totalElements.map(function (element) {
                        if (element._id == req.params.id)
                        {
                            element.name = req.body.name;
                            element.type = req.body.type;
                            element.description = req.body.description;
                        }
                        return element;
                    });

                    if(server.totalElements.length > 0)
                    {
                        res.send(202, {message:"Element has been modified .\n",object : server.totalElements  });
                    }
                    else
                    {
                        res.send(202, {message:"Element has been modified .\n", object : data});
                    }

                }
                else
                {
                    server.models.Element.findOne({_id : MyNewElements._id},onElementFind);
                    function onElementFind(err, data)
                    {
                        if(err)
                            res.send(500,{errorMessage:"Oops Something wrong with the server"});
                        else
                        {
                            if(data)
                            {
                                res.send(401,{errorMessage:"The element is not yours"});
                            }
                            else
                            {
                                res.send(404,{errorMessage:"The element doesn't exist"});
                            }
                        }
                    }
                }


                return;
            }
        }
    });
};