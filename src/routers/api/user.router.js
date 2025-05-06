import { Router } from "express"
import { usersManager } from "../../data/manager.mongo.js"
//import passport from "../../middlewares/passport.mid.js"
import passportCb from "../../middlewares/passportCb.mid.js"

const usersRouter = Router()

const createOne = async (req, res, next) => {

    try {
        const data = req.body
        const one = await usersManager.createOne(data)
        res.status(201).json({
            method: req.method,
            url: req.originalUrl,
            response: one,
        })

    } catch (error) {
        next(error)
    }
}

const readAll = async (req, res, next) => {

    try {
        const filter = req.query
        const all = await usersManager.readAll(filter)
        if (all.length > 0) {
            res.status(201).json({
                method: req.method,
                url: req.originalUrl,
                response: all,
            })
        } else {
            const error = new Error('Not found')
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const readById = async (req, res, next) => {
    try {
        const id = req.query
        const one = await usersManager.readById(id)
        if (one) {
            res.status(201).json({
                method: req.method,
                url: req.originalUrl,
                response: one,
            })

        } else {
            const error = new Error("Not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const id = req.query
        const data = req.body
        const one = await usersManager.findByIdAndUpdate(id, data)
        if (one) {
            res.status(201).json({
                method: req.method,
                url: req.originalUrl,
                response: one,
            })

        } else {
            const error = new Error("Not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const destroyByID = async (req, res, next) => {
    try {
        const id = req.query
        const one = await usersManager.destroyByID(id)
        if (one) {
            res.status(201).json({
                method: req.method,
                url: req.originalUrl,
                response: one,
            })

        } else {
            const error = new Error("Not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

usersRouter.post('/',passportCb("admin"), createOne)
usersRouter.get('/', passportCb("admin"), readAll)
usersRouter.get("/:id", passportCb("admin"), readById)
usersRouter.put("/:id", passportCb("user"), updateById)
usersRouter.delete("/id",passportCb("user"),  destroyByID)

export default usersRouter
