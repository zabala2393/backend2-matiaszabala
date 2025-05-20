import Routerhelper from "../../helpers/router.helper.js"
import { productsManager } from "../../data/manager.mongo.js"

const createOne = async (req, res) => {
    const data = req.body

    const title = data.title

    const exists = await productsManager.readBy({title})
    if (exists) {
        res.json400(`Ya existe un producto con el nombre ${title}`)
    }
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

    const id = req.params
    const one = await productsManager.readById(id)
    if (one) {
        res.json200(one)

    } else {
        res.json404()
    }

}

const updateById = async (req, res) => {

    const {id} = req.params
    const data = req.body
    const one = await productsManager.findByIdAndUpdate(id, data)
    if (one) {
        const message = "Producto actualizado"
        res.json201(one, message)

    } else {
        res.json404()
    }

}

const destroyByID = async (req, res) => {

    const {id} = req.params
    const one = await productsManager.destroyByID(id)
    if (one) {
        const message = "Producto eliminado"
        res.json201(one._id, message)

    } else {
        res.json404()
    }
}

class ProductsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.create('/', ["ADMIN"], createOne)
        this.read('/',["PUBLIC"], readAll)
        this.read("/:id",["PUBLIC"], readById)
        this.update("/:id", ["ADMIN"], updateById)
        this.destroy("/:id", ["ADMIN"], destroyByID)
    }
}

const productsRouter = new ProductsRouter().getRouter()
export default productsRouter