const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//RoleSchema
const RoleSchema = new Schema({
    name: {type: String, require: true},
    description: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("Role", RoleSchema)
