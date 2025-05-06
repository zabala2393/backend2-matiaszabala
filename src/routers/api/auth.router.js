import { Router } from "express"
import { usersManager } from "../../data/manager.mongo.js"
//import passport from "../../middlewares/passport.mid.js"
import { verifyToken } from "../../helpers/token.util.js"
import passportCb from "../../middlewares/passportCb.mid.js"


const authRouter = Router()

const registerCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const message = "Registrado"
        const data = { method, url, message }
        res.status(201).json(data)

    } catch (error) {
        next(error)
    }
}

const loginCb = async (req, res, next) => {

    try {

        const { method, originalUrl: url } = req
        const message = "Conectado"
        /* configurar la cookie con los datos del usuario */
        const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true }
        /* enviar respuesta al cliente */
        const data = { method, url, message }
        const { user } = req
        res
            .status(201)
            .cookie("token", user.token, opts)
            .json(data)

    } catch (error) {
        next(error)
    }
}

const signoutCb = (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const message = "signed out"

        /* eliminar cookie y enviar respuesta*/
        const data = { method, url, message }
        res.status(200)
            .clearCookie("token")
            .json(data)
    } catch (error) {
        next(error)
    }
}

const onlineCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req

        /* validar usuario conectado mediante cookies */

        const { token } = req.signedCookies

        const dataToken = verifyToken(token)

        /* usuario existe */
        let user = await usersManager.readById(dataToken?._id)

        if (!user) {
            const error = new Error("invalid credentials")
            error.statusCode = 401
            throw error
        }

        const { password, __v , createdAt, ...rest } = user
    

        const data = {

            method,
            url,
            user: rest
        }
        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
}

const badAuthCb = (req, res) => {
    try {
        const error = new Error("Bad Auth")
        error.statusCode = 401
        throw error
    } catch (error) {
        next(error)
    }
}

const forbiddenCb = (req, res) => {
    try {
        const error = new Error("Forbidden")
        error.statusCode = 401
        throw error
    } catch (error) {
        next(error)
    }
}

authRouter.post("/register", passportCb("register"), registerCb)
authRouter.post("/login", passportCb("login"), loginCb)
authRouter.post("/signout",passportCb("user"), signoutCb)
authRouter.get("/online", onlineCb)
authRouter.get("/bad-auth", badAuthCb)
authRouter.get("/forbidden", forbiddenCb)
authRouter.get("/google", passportCb("gooogle", { scope: ["email", "profile"] }))
authRouter.get("/google/redirect",passportCb("google"), loginCb)

export default authRouter