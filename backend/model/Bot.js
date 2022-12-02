import { getRandomName } from "../utils/bot.js"
import User from "./User.js"

export default class Bot {
    constructor() {
        const pseudo = getRandomName()
        const password = "azerty123"
        const gender = Math.random() < 0.5 ? "Homme" : "Femme"
        const description = ""
        this.user = new User(pseudo, password, gender, description, false)
    }
}