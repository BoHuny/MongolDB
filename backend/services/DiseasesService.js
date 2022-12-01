import { ObjectId } from "mongodb"

export default class DiseasesService {
    constructor(database) {
        this.database = database
        this.diseasesCollection = database.collection('diseases')
    }

    async createDisease(disease){
        let result = this.diseasesCollection.insertOne(disease);
        return result
    }

    async getDiseaseByID(idDisease){
        const query = { _id: new ObjectId(idDisease)}
        const option = {}
        let disease = await this.diseasesCollection.findOne(query, option);
        return disease
    }

}