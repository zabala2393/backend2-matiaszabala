import { Router } from "express"
import { usersManager } from "../../data/manager.mongo"

const authRouter = Router()

const registerCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const message = "Registrado"

        /* validaciones obligatorias */

        const { email, password, city } = req.body

        if (!email || !password || !city) {

            const error = new Error("invalid data")

            error.statusCode = 400
            throw error
        }

        /* validar si el usuario fue registrado */

        let user = await usersManager.readBy({ email })

        if (user) {
            const error = new Error("invalid credentials")
            error.statusCode = 401
            throw error
        }

        /* registro del usuario (create) */

        user = await usersManager.createOne(req.body)

        /* enviar respuesta al cliente */
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

        /* validaciones obligatorias */

        const { email, password } = req.body

        if (!email || !password) {

            const error = new Error("invalid data")

            error.statusCode = 400
            throw error
        }

        /* validar si el usuario fue registrado */

        let user = await usersManager.readBy({ email })

        if (!user) {
            const error = new Error("invalid credentials")
            error.statusCode = 401
            throw error
        }

        if (user.password !== req.body.password) {
            const error = new Error("invalid credentials")
            error.statusCode = 401
            throw error
        }

        /* configurar la cookie con los datos del usuario */

        const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true }

        /* enviar respuesta al cliente */
        const data = { method, url, message }
        res.status(201)
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

        const data = { method, url, user: { user_id, email, role, avatar:user.avatar } }
        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
}

authRouter.post("/register", registerCb)
authRouter.post("/login", loginCb)
authRouter.post("/signout", signoutCb)
authRouter.get("/online", onlineCb)

export default authRouter