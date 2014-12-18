var elements = [];

module.exports = function(server) {
    server.get('/elements', function(req, res) {
        res.send(elements);
    });

    server.post('/elements', function(req, res) {
        elements.push(req.body.name);
        res.send(req.body.name);
    });

    server.delete('/elements/:name', function(req, res) {
        var count = 0;

        elements = elements.filter(function(element) {
            if (element != req.params.name) {
                return true;
            }
            else {
                count++;

                return false;
            }
        });

        res.send(count.toString());
    });

    server.put('/elements/:name', function(req, res) {
        elements = elements.map(function(element) {
            if (element == req.params.name) element = req.body.name;
            return element;
        });

        res.send(elements);
    });
};
