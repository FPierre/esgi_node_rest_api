/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */


module.exports = function (app) {

    app.get('/signout', function (req, res) {
        req.session.login = ''
        //req.session.destroy(); // makes mongoose-session fail
        res.redirect('/');
    });




}
