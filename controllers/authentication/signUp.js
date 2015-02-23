/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */
var mongoose = require('mongoose');

var bodyParser = require('body-parser').json();
var sha1 = require('sha1');



module.exports = function(server) {


    server.post('/signup',bodyParser,server.middleware.isAnEmail ,NotInBase(server), createUser(server));


    server.get('/signup', function (req, res) {
        res.send('200');

    });

}

function createUser(server)
{
    return function saveUser(req,res,next)
    {
        if (req.body.name && req.body.password) {


            console.log("creating a user..." + req.body.name);
            var newUser = {};
            newUser.Name = req.body.name;
            newUser.Mail = req.body.mail;
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
            res.send(401, {errorMessage:"need password, name and mail"});
        }
    };
}




function NotInBase(server) {

    return function (req,res,next)
    {

        var bool = server.models.User.findOne({
            email: req.body.email,
            password:sha1(req.body.password)
        }, handleQueryResponse);

        function handleQueryResponse(err,user){
            if(err){
                res.send(500,{errorMessage:"Something went wrong"},err);
                return ;
            }
            if(!user)
            {
                next();
                return;
            }
            else
            {
                res.send(500,{errorMessage:"there is a user registered in the database with these information"},err);
                return;
            }
        }



    }
}



