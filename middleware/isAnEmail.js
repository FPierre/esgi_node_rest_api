/**
 * Created by thierryallardsaintalbin on 15/02/15.
 */
module.exports = function(server)
{

    server.middleware = server.middleware || {};

    server.middleware.isAnEmail = function (req, res, next)
    {
        var re = /^[a-zA-Z0-9_.-]+@{1}[a-zA-Z0-9_.-]{2,}\.[a-zA-Z.]{2,5}$/;
        var patt = new RegExp(re);


        if(patt.test(req.body.mail))
        {
            next();
        }
        else
        {
            res.send(400,"Wrong Email");

        }
    }
}
