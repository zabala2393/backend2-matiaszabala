import Routerhelper from "../../helpers/router.helper.js"
import { productsManager } from "../../data/manager.mongo.js"
//import passport from "../../middlewares/passport.mid.js"
import passportCb from "../../middlewares/passportCb.mid.js"

class ProductsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.create('/', ["ADMIN"], createOne)
        this.read('/', readAll)
        this.read("/:id", readById)
        this.update("/:id", ["ADMIN"], updateById)
        this.destroy("/id", ["ADMIN"], destroyByID)
    }
}

const createOne = async (req, res) => {
    const data = req.body
    const one = await productsManager.createOne(data)
    res.json201(one._id)
}

const readAll = async (req, res) => {
    const filter = req.query
    const all = await productsManager.readAll(filter)
    if (all.length > 0) {
        res.json200(all)
    } else {
        res.json404()
    }
}

const readById = async (req, res) => {

    const id = req.query
    const one = await productsManager.readById(id)
    if (one) {
        res.json200(one._id)

    } else {
        res.json404()
    }

}

const updateById = async (req, res) => {

    const id = req.query
    const data = req.body
    const one = await productsManager.findByIdAndUpdate(id, data)
    if (one) {
        res.json201(one._id)

    } else {
        res.json404()
    }

}

const destroyByID = async (req, res) => {

    const id = req.query
    const one = await productsManager.destroyByID(id)
    if (one) {
        res.json201(one._id)

    } else {
        res.json404()
    }

}

const productsRouter = new ProductsRouter().getRouter()
export default productsRouter