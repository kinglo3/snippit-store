const mongoose = require("mongoose");

const snippitSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    code: {type: String}
}, {
    timestamps: true
});

const Snippit = mongoose.model("snippit", snippitSchema);

module.exports = Snippit;