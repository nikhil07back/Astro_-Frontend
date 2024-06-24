import config from "../config/config"
import axios from "axios"
export default axios.create({
    baseURL : config.siteUrl+"astrology/",
    headers: {
        "authorization": localStorage.getItem("accessToken")      
     }
})



