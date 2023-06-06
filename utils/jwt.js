import jwt from "jsonwebtoken";

const sign = (payload) => jwt.sign(payload, process.env.TOKEN);

const verify = (token) => jwt.verify(token, process.env.TOKEN);

export { sign, verify };
