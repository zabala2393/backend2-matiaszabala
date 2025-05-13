import Routerhelper from "../../helpers/router.helper.js"
import { cartsManager } from "../../data/manager.mongo.js"
//import passport from "../../middlewares/passport.mid.js"
import passportCb from "../../middlewares/passportCb.mid.js"

class CartsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }
    init = () => {

        this.create('/', passportCb("user"), createOne)
        this.read('/', readAll)
        this.read("/:id", readById)
        this.update("/:id", updateById)
        this.destroy("/id", destroyByID)
    }
}

const createOne = async (req, res) => {

    try {
        const data = req.body
        const one = await cartsManager.createOne(data)
        res.status(201).json({
            method: req.method,
            url: req.originalUrl,
            response: one,
        })

    } catch (error) {
        next(error)
    }
}

const readAll = async (req, res) => {

    try {
        const filter = req.query
        const all = await cartsManager.readAll(filter)
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

const readById = async (req, res) => {
    try {
        const id = req.query
        const one = await cartsManager.readById(id)
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

const updateById = async (req, res) => {
    try {
        const id = req.query
        const data = req.body
        const one = await cartsManager.findByIdAndUpdate(id, data)
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

const destroyByID = async (req, res) => {
    try {
        const id = req.query
        const one = await cartsManager.destroyByID(id)
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


const cartsRouter = new CartsRouter().getRouter()
export default cartsRouter