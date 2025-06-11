import Routerhelper from "../../helpers/router.helper.js"
import cartsController from "../../controllers/carts.controller.js"

class CartsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
        this.controller = cartsController
    }

    init = () => {
        this.create('/', ["ADMIN"], cartsController.createOne)
        this.read('/', ["PUBLIC"], cartsController.readAll)
        this.read("/:id", ["PUBLIC"], cartsController.readById)
        this.update("/:id", ["ADMIN"], cartsController.updateById)
        this.destroy("/:id", ["ADMIN"], cartsController.destroyById)
    }
}

const cartsRouter = new CartsRouter().getRouter()
export default cartsRouter