import Routerhelper from "../../helpers/router.helper.js"
import { cartsManager } from "../../data/manager.mongo.js"
import passportCb from "../../middlewares/passportCb.mid.js"

const createOne = async (req, res) => {

    try {
        const data = req.body
        const one = await cartsManager.createOne(data)
        res.json201(one._id)

    } catch (error) {
        next(error)
    }
}

const readAll = async (req, res) => {

    try {
        const filter = req.query
        const all = await cartsManager.readAll(filter)
        if (all.length > 0) {
            res.json201(all)
        } else {
            res.json404()
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
            res.json201(one)
        } else {
            res.json404()
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
            res.json201(one)

        } else {
            res.json404()
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
            res.json201(one)

        } else {
            res.json404()
        }
    } catch (error) {
        next(error)
    }
}

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

const cartsRouter = new CartsRouter().getRouter()
export default cartsRouter