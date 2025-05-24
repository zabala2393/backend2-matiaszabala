import Routerhelper from "../../helpers/router.helper.js"
import productsController from "../../controllers/products.controller.js"

class ProductsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
        this.controller = productsController
    }

    init = () => {
        this.create('/', ["ADMIN"], productsController.createOne)
        this.read('/', ["PUBLIC"], productsController.readAll)
        this.read("/:id", ["PUBLIC"], productsController.readById)
        this.update("/:id", ["ADMIN"], productsController.updateById)
        this.destroy("/:id", ["ADMIN"], productsController.destroyByID)
    }
}

const productsRouter = new ProductsRouter().getRouter()
export default productsRouter