import  productsRepository  from "../dao/factory.js";

class ProductsService {
    constructor() {
        this.repository = productsRepository
    }

    createOne= async(data) => await this.repository.createOne(data)
    readAll = async (filter) => await this.repository.readAll(filter)
    readById = async(id) => await this.repository.readById(id)
    updateById = async(id, data) => await this.repository.findByIdAndUpdate(id, data)
    destroyById = async(id)=> await this.repository.destroyByID(id)
}

const productsService = new ProductsService()
export default productsService