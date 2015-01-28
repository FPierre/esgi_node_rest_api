var elements = [];

module.exports = function(server) {
    server.get('/elements',server.middleware.isLoggedIn ,function(req, res) {

        server.models.Element.find({},handleQueryResponse);

        function handleQueryResponse(err,data)
        {
            if(err)
            {
                res.send(500, err.toString());
                return;
            }
            else {
                elements = data;
                res.send(elements);
            }
            // res.send(elements);
        }

    });

    server.post('/elements',server.middleware.isLoggedIn, function(req, res) {

        MyNewElements = {};
        MyNewElements.name = req.body.name;
        MyNewElements.idOwner = req.session.userId;


        MyNewElements = new server.models.Element(MyNewElements);
        MyNewElements.save(onElementCreated);


        function onElementCreated(err,MyNewElements)
        {
            if(err)
            {
                res.send(500,err.toString());
                return;
            }
            else
            {
                elements.push(MyNewElements);
                res.send(MyNewElements.toJSON());
            }
        }

    });

    server.delete('/elements/:name', server.middleware.isLoggedIn,function(req, res) {
        var count = 0;



        MyNewElements = {};
        MyNewElements.name = req.params.name;
        MyNewElements.idOwner = req.session.userId;
        MyNewElements = new server.models.Element(MyNewElements);

        server.models.Element.findOneAndRemove( {name : MyNewElements.name , idOwner : MyNewElements.idOwner} ,onElementRemoved);

        function onElementRemoved(err,data)
        {
            if(err)
            {
                res.send(500,err.toString());
                return;
            }
            else
            {
                elements = elements.filter(function(element) {
                    if (element != req.params.name) {
                        return true;
                    }
                    else {
                        count++;

                        return false;
                    }
                });
                res.send(202,"Element named '" + req.params.name + "' has been removed");
                return;
            }
        }
    });

    server.put('/elements/:name', server.middleware.isLoggedIn,function(req, res) {


        MyNewElements = {};
        MyNewElements.name = req.params.name;
        MyNewElements.idOwner = req.session.userId;
        MyNewElements = new server.models.Element(MyNewElements);

        server.models.Element.findOneAndUpdate( {name : MyNewElements.name , idOwner : MyNewElements.idOwner},{ name : req.body.name} ,onElementModified);

        function onElementModified(err,data) {
            if (err) {
                res.send(500, err.toString())
                return;
            }
            else {
                elements = elements.map(function (element) {
                    if (element == req.params.name) element = req.body.name;
                    return element;
                });
                res.send(202, "Element named '" + req.params.name + "' has been modified to '" + req.body.name + "'");
                return;
            }
        }
    });
};
