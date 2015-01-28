var mongoose = require('mongoose')
ObjectId = mongoose.Schema.ObjectId;
module.exports = function(server) {
    var ElementSchema = server.mongoose.Schema({
        // Se faire un id unique sur un Number ou sur le name ?

        name: {
            type: String,
            required: true,
            unique : false
        },
        borrowingDate: {
            type: Date,
            required: true,
            default: Date.now,
            unique: false
        },
        numberBorrowing: {
            type: Number,
            unique: false
        },

        idOwner : {
            type :ObjectId,
            unique : false
        }
    });

    //ElementSchema.index({id:1}, {unique:true});
    ElementSchema.plugin(require('mongoose-timestamp'));
    
    ElementSchema.methods.toJSON = function() {
        return this.toObject();
    };

    return server.mongoose.model(server.referenceModel.Elements, ElementSchema);
};
