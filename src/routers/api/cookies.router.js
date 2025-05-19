import { Router } from "express"

const coookiesRouter = Router()

const createCb = (req, res, next) => {
    try {        
        const { method, originalUrl: url } = req
        const message = "Cookie creada"
        const data = { method, url, message }
        res
            .status(201)
            .cookie("user_id", "123456abcdef", { maxAge: 7 * 24 * 60 * 60 * 1000 })
            .cookie("role", "admin", {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                signed: true,
            })
            .json(data)

    } catch (error) {
        next(error)
    }
}

const readCb = (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const message = "Cookie leida"
        const cookies = { common: req.cookies, signed: req.signedCookies }
        const data = { method, url, message, cookies }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

const clearCB = (req,res,next) => {
    try {
        const { method, originalUrl: url } = req
        const message = "Cookie limpiada"
        const data = { method, url, message }
        res.status(200)
        .clearCookie("user_id")
        .clearCookie("role")
        .json(data)

    } catch (error) {
        next(error)
    }
}

/* cookie comun*/
coookiesRouter.get("/create", createCb)
coookiesRouter.get("/read", readCb)
coookiesRouter.get("/clear", clearCB)

export default coookiesRouter