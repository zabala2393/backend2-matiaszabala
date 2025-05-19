import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => hashSync(password, genSaltSync(10))
const compareHash = (password, dbPassword) => compareSync(password, dbPassword)

export {createHash, compareHash}