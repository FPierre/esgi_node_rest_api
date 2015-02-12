var mongoose = require('mongoose');

ObjectId = mongoose.Schema.ObjectId;

module.exports = function(server) {
    var BorrowSchema = server.mongoose.Schema({
        elementId: {
            type: ObjectId,
            required: true,
            unique: false
        },
        userId: {
            type: ObjectId,
            unique: false
        },
        ownerId: {
            type: ObjectId,
            unique: false
        },
        condition: {
            type: String,
            required: true,
            unique : false
        }
    });

    BorrowSchema.methods.toJSON = function() {
        return this.toObject();
    };

    return server.mongoose.model(server.referenceModel.Borrows, BorrowSchema);
};
