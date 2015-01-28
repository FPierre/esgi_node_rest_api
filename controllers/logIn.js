var sha1 = require('sha1');
var bodyParser = require('body-parser').json();

/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */

module.exports = function (app) {



    var err = {};

    /**
     * get
     * Gets signin page
     */

    app.get('/login', function (req, res)
    {
        console.log(req.session)
        res.send('200');
    });

    /**
     * post
     * signs in application
     */

    app.post('/login', function (req,res){
        var NewUser ={};

        var request = app.models.User.findOne({
            Mail: req.body.mail,
            Password:sha1(req.body.password)
        }, handleQueryResponse);

        function handleQueryResponse(err,user){
            if(err){
                res.send(500,"Something went wrong",err);
                return ;
            }
            if(!user)
            {
                res.send(500,"you are not registered in the database");
                return ;
            }
            else
            {

                req.session.userId = user._id;
                res.status(202).send("you sign in");
                return ;
            }
        }
    });

}
