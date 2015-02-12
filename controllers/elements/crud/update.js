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

        console.log(req.params.id);
        console.log(req.body.description);
        console.log(req.body.type);

        console.log(req.body);
        MyNewElements = new server.models.Element(MyNewElements);
        server.models.Element.findOneAndUpdate( {_id : MyNewElements._id , idOwner : MyNewElements.idOwner},{ name : MyNewElements.name,type : MyNewElements.type, description : MyNewElements.description} ,onElementModified);

        function onElementModified(err,data) {
            if (err) {
                res.send(500, err.toString())
                return;
            }
            else {
                server.totalElements = server.totalElements.map(function (element) {
                    if (element._id == req.params.id)
                    {
                        element.name = req.body.name;
                        element.type = req.body.type;
                        element.descrption = req.body.description;
                    }
                    return element;
                });
                res.send(202, "Element has been modified .\n'" + server.totalElements  + "'");
                return;
            }
        }
    });
};