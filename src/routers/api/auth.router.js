import { Router } from "express"
import { usersManager } from "../../data/manager.mongo.js"
import passport from "../../middlewares/passport.mid.js"

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
        const {user} = req
        res
            .status(201)
            .cookie("user_id", user._id, opts)
            .cookie("role", usersRouter.role, opts)
            .cookie("email", user.email, opts)
            .json(data)

    } catch (error) {
        next(error)
    }
}

const signoutCb = (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const message = "signed out"

        /* eliminar cookioe y enviar respuesta*/
        const data = { method, url, message }
        res.status(200)
            .clearCookie("user_id")
            .clearCookie("role")
            .clearCookie("email")
            .json(data)
    } catch (error) {
        next(error)
    }
}

const onlineCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req

        /* validar usuario conectado mediante cookies */

        const { user_id, email, role } = req.signedCookies

        /* usuario existe */
        let user = await usersManager.readBy({ user_id })

        if (!user) {
            const error = new Error("invalid credentials")
            error.statusCode = 401
            throw error
        }

        const data = { method, url, user: { user_id, email, role, avatar: user.avatar } }
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

const optsBadAuth = { session: false, failureRedirect: "/api/auth/bad-auth" }

authRouter.post("/register", passport.authenticate("register", optsBadAuth), registerCb)
authRouter.post("/login", passport.authenticate("login", optsBadAuth), loginCb)
authRouter.post("/signout", signoutCb)
authRouter.get("/online", onlineCb)
authRouter.get("/bad-auth", badAuthCb)

export default authRouter