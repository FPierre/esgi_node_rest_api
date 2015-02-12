var mongoose = require('mongoose')
ObjectId = mongoose.Schema.ObjectId;
module.exports = function(server) {
    var ElementSchema = server.mongoose.Schema({

        name: {                 //nom d'un élément
            type: String,
            required: true,
            unique : false
        },

        type:{
            type: String,
            required: true,
            unique : false
        },

        description:{
            type:String,
            required: false,
            unique : false
        },

        available :{
            type:Boolean,
            required : false,
            unique : false,
            default : true
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
