var sha1 = require('sha1');
var bodyParser = require('body-parser').json();

/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */

module.exports = function (server) {


    /**
     * get
     * Gets signin page
     */

    server.get('/login', function (req, res)
    {
        console.log(req.session)
        res.send('200');
    });

    /**
     * post
     * signs in application
     */

    server.post('/login',server.middleware.isAnEmail, function (req,res){
        var NewUser ={};

        var request = server.models.User.findOne({
            Mail: req.body.mail,
            Password:sha1(req.body.password)
        }, handleQueryResponse);

        function handleQueryResponse(err,user){
            if(err){
                res.send(500,{errorMsg:"Something went wrong"},err);
                return ;
            }
            if(!user)
            {
                // On recupere ici une 401 si l'utilisateur a mal saisi son login ou son mot de passe
                res.send(401,{errorMsg:"you are not registered in the database"});
                return ;
            }
            else
            {

                req.session.userId = user._id;
                res.status(202).send({message:"you sign in"});
                return ;
            }
        }
    });

}
