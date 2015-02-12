var elements = [];

module.exports = function(server) {
    /**
     * Fonctionnalité n°8 : Demander un emprunt à une personne du réseau
     *
     * Paramètres body : {elementId=100}
     */
    server.post('/user/:id/borrow', server.middleware.isLoggedIn, function(req, res) {
        if (req.body.elementId == undefined || req.body.elementId == null) {
            res.send(500, err.toString());

            return;    
        }

        OtherUser    = {};
        OtherUser.id = req.body.id;
        Element.id   = req.body.elementId;
        MyUser.id    = req.session.userId;

        // Cherche l'utilisateur à qui la demande est adressée
        server.models.User.findOne({id: OtherUser.id}, function(err, data) {
            if (err) {
                res.send(500, err.toString());

                return;
            }
            else {
                OtherUser = data;
            }
        });

        if (OtherUser) {
            // Cherche l'élément pour lequel la demande d'emprunt est faite
            server.models.Element.findOne({id: Element.id}, function(err, data) {
                if (err) {
                    res.send(500, err.toString());

                    return;
                }
                else {
                    Element = data;
                }
            });
        }

        if (Element) {
            console.log('Creating a borrow with OtherUser.id = ' + OtherUser.id + ' and Element.id = ' + Element.id);
            var newBorrow = {};
            newUser.Name  = req.body.name;
            newUser.Mail  = req.body.mail;
            newUser.Password = sha1(req.body.password);



            var newUser = server.models.User(newUser);

            newUser.save(onUserCreate);
            function onUserCreate(err, user) {
                if (err) {
                    res.send(500, err.toString());
                }
                else {
                    res.send(user.toJSON());
                }
            }
            req.session.userId = newUser._id;
            return;
        }
        else {
            res.send(401, "need password, name and mail");
        }
    });

    /**
     * Fonctionnalité n°9 : Accepter une demande d'emprunt
     *
     * Paramètres body : vide
     */
    server.put('/user/:id/borrow/:id/accept', server.middleware.isLoggedIn, function(req, res) {
        MyNewElements = {};
        MyNewElements.name = req.body.name;
        MyNewElements.idOwner = req.session.userId;

        MyNewElements = new server.models.Element(MyNewElements);
        MyNewElements.save(onElementCreated);

        function onElementCreated(err, MyNewElements)
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

    /**
     * Fonctionnalité n°10 : Refuser une demande d'emprunt
     *
     * Paramètres body : vide
     */
    server.put('/user/:id/borrow/:id/refuse', server.middleware.isLoggedIn, function(req, res) {
        MyNewElements = {};
        MyNewElements.name = req.body.name;
        MyNewElements.idOwner = req.session.userId;

        MyNewElements = new server.models.Element(MyNewElements);
        MyNewElements.save(onElementCreated);

        function onElementCreated(err, MyNewElements)
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
