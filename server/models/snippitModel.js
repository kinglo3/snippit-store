const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const snippitSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    code: { type: String} ,
    user: { type: ObjectId, required: true }
}, {
    timestamps: true
});

const Snippit = mongoose.model("snippit", snippitSchema);

module.exports = Snippit;