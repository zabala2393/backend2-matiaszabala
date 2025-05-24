import cartsService from "../services/carts.services.js"

class CartsController {

    constructor() {
        this.service = cartsService
    }

    createOne = async (req, res) => {

        try {
            const data = req.body
            const one = await this.service.createOne(data)
            res.json201(one._id)

        } catch (error) {
            next(error)
        }
    }

    readAll = async (req, res) => {

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

    readById = async (req, res) => {
        try {
            const {id} = req.query
            const one = await this.service.readById(id)
            if (one) {
                res.json201(one)
            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }

    updateById = async (req, res) => {
        try {
            const {id} = req.query
            const data = req.body
            const one = await this.service.findByIdAndUpdate(id, data)
            if (one) {
                res.json201(one)

            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }

    destroyById = async (req, res) => {
        try {
            const {id} = req.query
            const one = await this.service.destroyById(id)
            if (one) {
                res.json201(one)

            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }
}

const cartsController = new CartsController()
export default cartsController