const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Setting Schema
const SettingSchema = new Schema({
    hours: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'Users'}
}, {timestamps: true});

module.exports = mongoose.model("Setting", SettingSchema)
