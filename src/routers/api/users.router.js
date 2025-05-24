import usersController from "../../controllers/users.controller.js"
import Routerhelper from "../../helpers/router.helper.js"
import passportCb from "../../middlewares/passportCb.mid.js"

class UsersRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
        this.controller = usersController
    }

    init = () => {
        this.create('/', passportCb("ADMIN"), usersController.createOne)
        this.read('/', passportCb("ADMIN"), usersController.readAll)
        this.read("/:id",passportCb("ADMIN"), usersController.readById)
        this.update("/:id",passportCb("USER"), usersController.updateById)
        this.destroy("/id", passportCb("USER"), usersController.destroyByID)
    }
}
const usersRouter = new UsersRouter().getRouter()
export default usersRouter