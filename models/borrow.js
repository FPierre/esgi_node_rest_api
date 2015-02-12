var mongoose = require('mongoose');

ObjectId = mongoose.Schema.ObjectId;

module.exports = function(server) {
    var BorrowSchema = server.mongoose.Schema({
        ElementId: {
            type: ObjectId,
            required: true,
            unique: false
        },
        UserId: {
            type: ObjectId,
            unique: false
        },
        OwnerId: {
            type: ObjectId,
            unique: false
        },
        Condition: {
            type: String,
            required: true,
            unique : false
        },
        BorrowDate: {
            type: Date,
            required: true,
            default: Date.now,
            unique: false
        },
        LendDate: {
            type: Date,
            required: true,
            default: Date.now,
            unique: false
        }
    });

    BorrowSchema.methods.toJSON = function() {
        return this.toObject();
    };

    return server.mongoose.model(server.referenceModel.Borrows, BorrowSchema);
};
