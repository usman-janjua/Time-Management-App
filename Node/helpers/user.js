const jwt = require("jsonwebtoken");

exports.user = function (authorization)
{
    const usertoken = authorization;
    const token = usertoken.split(' ');
    const user = jwt.verify(token[1], process.env.JWT_SECRET);
    return user;
}