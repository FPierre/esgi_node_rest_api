/**
 * Created by thierryallardsaintalbin on 22/12/14.
 */

module.exports = function(server) {
    var UserSchema = server.mongoose.Schema({


        Mail: {
            type: String,
            required: true,
            unique: true
        },
        Name: {
            type: String,
            required: true,
            unique: false

        },
        Password: {
            type: String,
            required: true,
            unique : false
        }
    });

    UserSchema.plugin(require('mongoose-timestamp'));

    UserSchema.methods.toJSON = function() {
        return this.toObject();
    };

    return server.mongoose.model(server.referenceModel.Users, UserSchema);
};
