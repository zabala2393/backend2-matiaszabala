import { productsManager } from "../dao/factory.js";
import ProductsDTO from "../dto/products.dto.js"

class ProductsRepository {
    constructor() {
        this.manager = productsManager
    }

    createOne = async (data) => await productsManager.createOne(new ProductsDTO(data))
    readAll = async (filter) => await productsManager.readAll(filter)
    readById = async (id) => await productsManager.readById(id)
    readBy = async (filter) => await usersManager.readBy(filter)
    updateById = async (id, data) => await productsManager.findByIdAndUpdate(id, data)
    destroyById = async (id) => await productsManager.destroyByID(id)
}

const productsRepository = new ProductsRepository()
export default productsRepository