import { getRandomName } from "../utils/bot.js"
import User from "./User.js"

export default class Bot {
    constructor(allDiseases) {
        const pseudo = getRandomName()
        const password = "azerty123"
        const gender = Math.random() < 0.5 ? "Homme" : "Femme"
        const description = ""
        this.user = new User(pseudo, password, gender, description, false)
        if(Math.random()>0.4){
            this.user.listDiseases.push({diseaseID:allDiseases[Math.floor(Math.random() * allDiseases.length)]._id,startTime:new Date()})
        }
    }
}