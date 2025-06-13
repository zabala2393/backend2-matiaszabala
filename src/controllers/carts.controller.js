import { isValidObjectId } from "mongoose"
import cartsService from "../services/carts.services.js"

class CartsController {

    constructor() {
        this.service = cartsService
    }

    createOne = async (req, res, next) => {

        try {
            const { product_id, user_id } = req.body
            if (!product_id || !user_id) {
                res.json400("Usted no esta conectado o no hay ningun producto")
            }
            if (!isValidObjectId(product_id) || !isValidObjectId(user_id)) {
                res.json400("ID no valido")
            }

            const one = await this.service.createOne({ product_id, user_id })
            res.json201(one._id)
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
                res.json404("No hay ninguno carrito creado")
            }
        } catch (error) {
            next(error)
        }
    }

    readById = async (req, res, next) => {
        try {
            const { id } = req.params
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

    updateById = async (req, res, next) => {
        try {
            const { id } = req.params
            const data = req.body
            const one = await this.service.updateById(id, data)
            if (one) {
                res.json201(one)

            } else {
                res.json404()
            }
        } catch (error) {
            next(error)
        }
    }

    destroyById = async (req, res, next) => {
        try {
            const { id } = req.params
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