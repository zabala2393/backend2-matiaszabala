import {connect} from "mongoose"

const dbConnect = async (url)=>{
    try {
        await connect(url)
        console.log("Connected to Mongo Database")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect