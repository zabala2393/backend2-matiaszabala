import { usersManager } from "../../data/manager.mongo.js"
import Routerhelper from "../../helpers/router.helper.js"
import passportCb from "../../middlewares/passportCb.mid.js"


const createOne = async (req, res, next) => {
    try {
        const data = req.body
        const one = await usersManager.createOne(data)
        res.json201(one)
    } catch (error) {
        next(error)
    }
}

const readAll = async (req, res, next) => {

    try {
        const filter = req.query
        const all = await usersManager.readAll(filter)
        if (all.length > 0) {
            res.json201(all)
        } else {
            res.json404()
        }
    } catch (error) {
        next(error)
    }
}

const readById = async (req, res, next) => {
    try {
        const id = req.query
        const one = await usersManager.readById(id)
        if (one) {
            res.json201(one._id)

        } else {
            res.json404()
        }
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const id = req.query
        const data = req.body
        const one = await usersManager.findByIdAndUpdate(id, data)
        if (one) {
            res.json201(one._id)

        } else {
            res.json404()
        }
    } catch (error) {
        next(error)
    }
}

const destroyByID = async (req, res, next) => {
    try {
        const id = req.query
        const one = await usersManager.destroyByID(id)
        if (one) {
            res.json201(one._id)

        } else {
            res.json404()
        }
    } catch (error) {
        next(error)
    }
}


class UsersRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.create('/', passportCb("ADMIN"), createOne)
        this.read('/', passportCb("ADMIN"), readAll)
        this.read("/:id",passportCb("ADMIN"), readById)
        this.update("/:id",passportCb("USER"), updateById)
        this.destroy("/id", passportCb("USER"), destroyByID)
    }
}

const usersRouter = new UsersRouter().getRouter()
export default usersRouter