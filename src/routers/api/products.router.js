import { Router } from "express"
import { productsManager } from "../../data/manager.mongo.js"
//import passport from "../../middlewares/passport.mid.js"
import passportCb from "../../middlewares/passportCb.mid.js"

const productsRouter = Router()

const createOne = async (req, res, next) => {

    try {
        const data = req.body
        const one = await productsManager.createOne(data)
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
        const all = await productsManager.readAll(filter)
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

const readById = async (req,res,next) => {
    try {
        const id = req.query
        const one = await productsManager.readById(id)
        if(one){
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

const updateById = async (req,res,next) => {
    try {
        const id = req.query
        const data = req.body
        const one = await productsManager.findByIdAndUpdate(id, data)
        if(one){
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

const destroyByID = async (req,res,next) => {
    try {
        const id = req.query
        const one = await productsManager.destroyByID(id)
        if(one){
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



productsRouter.post('/', passportCb("admin"), createOne)
productsRouter.get('/', readAll)
productsRouter.get("/:id", readById)
productsRouter.put("/:id",passportCb("admin"), updateById)
productsRouter.delete("/id",passportCb("admin"), destroyByID)

export default productsRouter