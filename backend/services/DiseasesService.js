import { ObjectId } from "mongodb"

export default class DiseasesService {
    constructor(database, usersService) {
        this.database = database
        this.diseasesCollection = database.collection('diseases')
        this.usersService = usersService
    }

    async createDisease(disease){
        let result = this.diseasesCollection.insertOne(disease);
        return result
    }

    async getDiseases(){
        const mongoDiseases = await this.diseasesCollection.find({}).toArray()
        return mongoDiseases
    }

    async getDiseaseByID(idDisease){
        const query = { _id: new ObjectId(idDisease)}
        const option = {}
        let disease = await this.diseasesCollection.findOne(query, option);
        return disease
    }

    async getDiseasesByUserID(idUser){
        let user = this.usersService.getUserByID(idUser)
        return user.listDiseases
    }

}