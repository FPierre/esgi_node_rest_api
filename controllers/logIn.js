/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */

module.exports = function (app) {



    var err = {};

    /**
     * get
     * Gets signin page
     */

    app.get('/'), function (req, res)
    {
        console.log(req.session)
        res.send('200');
    }

    /**
     * post
     * signs in application
     */

    app.post('/'), function (req,res){
        var user = server.models.User.findOne({
            email: req.body.email,
            password:sha1(req.body.password)
        }, handleQueryResponse);

        if(user)
        {
            req.session.userId = user._id;
            res.send(202,"you sign in");
            return;
        }
        else
        {
            res.send(400,"wrong password");
        }
    }

}
