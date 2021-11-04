const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Worklog Schema
const WorklogSchema = new Schema({
    hours: {type: String, require: true},
    date: {type: Date, require: true,},
    note: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'Users'}
}, {timestamps: true});

module.exports = mongoose.model("Worklog", WorklogSchema)
