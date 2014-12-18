module.exports = function(server) {
    var ElementSchema = server.mongoose.Schema({
        // Se faire un id unique sur un Number ou sur le name ?
        id: Number,
        name: {
            type: String,
            required: true
        },
        borrowingDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        numberBorrowing: {
            type: Number,
            required: true
        }
    });

    ElementSchema.index({id:1}, {unique:true});
    ElementSchema.plugin(require('mongoose-timestamp'));
    
    ElementSchema.methods.toJSON = function() {
        return this.toObject();
    };

    return server.mongoose.model('Element', ElementSchema);
};
