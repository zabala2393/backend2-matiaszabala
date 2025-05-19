import Routerhelper from "../helpers/router.helper.js"
import { productsManager } from "../data/manager.mongo.js"

const homeViewCb = async (req, res) => {
    const products = await productsManager.readAll()
    res.status(200).render("index", { products })
}

const productViewCb = async (req, res) => {
    const { pid } = req.params
    const product = await productsManager.readById(pid)
    res.status(200).render("product", { product })
}

const registerViewCb = async (req, res) => {
    const products = await productsManager.readAll()
    res.status(200).render("register", { products })
}

const loginViewCb = async (req, res) => {
    const products = await productsManager.readAll()
    return res.render("login", { products })
}

const profileViewCb = async (req, res) => {
    const products = await productsManager.readAll()
    res.status(200).render("profile", { products })
}

class ViewsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.read("/",["PUBLIC"], homeViewCb)
        this.read("/register",["PUBLIC"], registerViewCb)
        this.read("/login",["PUBLIC"], loginViewCb)
        this.read("/profile",["USER", "ADMIN"], profileViewCb)
        this.read("/product/:pid",["USER", "ADMIN"], productViewCb)
    }
}

const viewsRouter = new ViewsRouter().getRouter()
export default viewsRouter