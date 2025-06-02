import Carrito from "./models/carritos.models.js"
import Producto from "./models/productos.models.js"
import Usuario from "./models/usuarios.models.js"

class DaoMongo {
    constructor(model){
        this.model = model
    }
    createOne = async (data) => await this.model.create(data)
    readAll = async (filtro) => await this.model.find(filtro).lean()
    readBy = async(data) =>await this.model.findOne(data).lean()
    readById = async(id) =>await this.model.findById(id).lean()
    updateById = async(id,data) => await this.model.findByIdAndUpdate(id, data)
    destroyById = async(id) => await this.model.findByIdAndDelete(id)
}

const usersManager = new DaoMongo(Usuario)
const cartsManager = new DaoMongo(Carrito)
const productsManager = new DaoMongo(Producto)

export {usersManager, cartsManager, productsManager}
