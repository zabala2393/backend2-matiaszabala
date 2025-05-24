import productsService from "../services/products.services.js"

class ProductsController {

    constructor(){
        this.service = productsService
    }

    createOne = async (req, res) => {
        const data = req.body
        const title = data.title
        const exists = await productsService.readAll({ title })
        if (exists) {
            res.json400(`Ya existe un producto con el nombre ${title}`)
        }
        const one = await productsService.createOne()
        res.json201(one)
    }
    readAll = async (req, res) => {
        const filter = req.query
        const all = await productsService.readAll(filter)
        if (all.length > 0) {
            res.json200(all)
        } else {
            res.json404()
        }
    }
    readById = async (req, res) => {

        const {id} = req.params
        const one = await productsService.readById(id)
        if (one) {
            res.json200(one)
        } else {
            res.json404()
        }
    }
    updateById = async (req, res) => {
        const { id } = req.params
        const data = req.body
        const one = await productsService.updateById(id,data)
        if (one) {
            const message = "Producto actualizado"
            res.json201(one, message)

        } else {
            res.json404()
        }
    }
    destroyByID = async (req, res) => {

        const { id } = req.params
        const one = await productsService.destroyById(id)
        if (one) {
            const message = "Producto eliminado"
            res.json201(one._id, message)

        } else {
            res.json404()
        }
    }
}

const productsController = new ProductsController()
export default productsController