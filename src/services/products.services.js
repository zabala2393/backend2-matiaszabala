import { productsManager } from "../data/manager.mongo.js";

class ProductsService {
    constructor() {
        this.manager = productsManager
    }

    createOne= async(data) => await productsManager.createOne(data)
    readAll = async (filter) => await productsManager.readAll(filter)
    readById = async(id) => await productsManager.readById(id)
    updateById = async(id, data) => await productsManager.findByIdAndUpdate(id, data)
    destroyById = async(id)=> await productsManager.destroyByID(id)
}

const productsService = new ProductsService()
export default productsService