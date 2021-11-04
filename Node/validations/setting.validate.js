const Joi = require("@hapi/joi");

//For Create and Edit
const settingSchema = Joi.object({
    hours: Joi.number().required(),
})

module.exports = {
    settingSchema
}