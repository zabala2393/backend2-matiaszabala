import productsService from "../services/products.services.js"

class ProductsController {

    constructor(){
        this.service = productsService
    }

    createOne = async (req, res) => {
        const data = req.body
        const title = data.title
        const exists = await this.service.readAll({title})
        console.log(exists)
        if (exists.length>0) {
            res.json400(`Ya existe un producto con el nombre ${title}`)
        }
        const one = await this.service.createOne(data)
        res.json201(one)
    }
    readAll = async (req, res) => {
        const filter = req.query
        const all = await this.service.readAll(filter)
        if (all.length > 0) {
            res.json200(all)
        } else {
            res.json404()
        }
    }
    readById = async (req, res) => {

        const {id} = req.params
        const one = await this.service.readById(id)
        if (one) {
            res.json200(one)
        } else {
            res.json404()
        }
    }
    updateById = async (req, res) => {
        const { id } = req.params
        const data = req.body
        const one = await this.service.updateById(id,data)
        if (one) {
            const message = "Producto actualizado"
            res.json201(one, message)

        } else {
            res.json404()
        }
    }
    destroyByID = async (req, res) => {

        const { id } = req.params
        const one = await this.service.destroyById(id)
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