import usersService from "../services/users.services.js"

class UsersController {

    constructor() {
        this.service = usersService
    }
    createOne = async (req, res, next) => {
        try {
            const data = req.body
            const one = await this.service.createOne(data)
            res.json201(one)
        } catch (error) {
            next(error)
        }
    }
    readAll = async (req, res, next) => {

        try {
            const filter = req.query
            const all = await this.service.readAll(filter)
            if (all.length > 0) {
                res.json201(all)
            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }
    readById = async (req, res, next) => {
        try {
            const {id} = req.query
            const one = await this.service.readById(id)
            if (one) {
                res.json201(one._id)

            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }
    updateById = async (req, res, next) => {
        try {
            const {id} = req.query
            const data = req.body
            const one = await this.service.findByIdAndUpdate(id, data)
            if (one) {
                res.json201(one._id)

            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }
    destroyByID = async (req, res, next) => {
        try {
            const {id} = req.query
            const one = await this.service.destroyById(id)
            if (one) {
                res.json201(one._id)

            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }
}

const usersController = new UsersController()

export default usersController