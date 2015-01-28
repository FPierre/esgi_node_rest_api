/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */

module.exports = function(server)
{

    server.middleware = server.middleware || {};

    server.middleware.isLoggedIn = function (req, res, next)
    {

        if( !req.session.userId){
            res.send(401," you must be authenticated");


            return;
        }
        else
        {

            server.models.User.findById(req.session.userId,handleQueryResponse);

            function handleQueryResponse(err,user)
            {
                if(err){
                    res.send(500,"Something went wrong",err);
                    return ;
                }


                if(!user)
                {
                    res.send(404,"try again");
                    return ;
                }


            }
            next();
        }
    }
}


