const Joi = require("@hapi/joi");

const roleSchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string()
})

module.exports = {
    roleSchema
}