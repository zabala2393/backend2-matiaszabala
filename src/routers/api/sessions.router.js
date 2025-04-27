import { Router } from "express";
import session from "express-session";

const sessionRouter = Router()

const createCb = (req, res, next) => {
    try {
        const {method, originalUrl:url} = req
        const message = "Session Created"
        const data = {method, url, message}
        req.session.role = "ADMIN"
        req.session.user_id = "abc123"
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

const readCb = (req, res, next) => {
    try {
        const {method, originalUrl:url} = req
        const message = "Session Read"
        const sessions = req.session
        const data = {method, url, message,sessions}
        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
}
const destroyCb = (req, res, next) => {
    try {
        const {method, originalUrl:url} = req
        const message = "Session Destroyed"
        const data = {method, url, message}
        req.session.destroy()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

sessionRouter.use("/create", createCb)
sessionRouter.use("/read", readCb)
sessionRouter.use("/destroy", destroyCb)

export default sessionRouter