const Joi = require("@hapi/joi");

//For Create and Edit
const worklogSchema = Joi.object({
    hours: Joi.number().required(),
    date: Joi.date().iso().required(),
    note: Joi.string().min(10).required()
})
//For Filterworklog
const worklogFilter = Joi.object({
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
})

module.exports = {
    worklogSchema,
    worklogFilter

}