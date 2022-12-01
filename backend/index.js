import express from 'express'
import cors from 'cors'
import getRoutes from './routes/index.js'
import 'dotenv/config'
import UsersService from './services/UsersService.js'
import NotifsService from './services/NotifsService.js'

import { MongoClient, ObjectId } from 'mongodb'
import User from './model/User.js'
import Notif from './model/Notif.js'

const uri ="mongodb://20.111.50.245:27017/"
const database = new MongoClient(uri).db("mongolDB")

const userService = new UsersService(database)
const notifService = new NotifsService(database, userService)

const services = {
    "users" : userService,
    "notifs" : notifService
}

// await services.notifs.createNotifForOneUser(new ObjectId("63891a76136dd44526e03e84"), new Notif("BAISER", 2, "JE VEUX BAISER", 3))
let notif = await services.notifs.getNotifs(new ObjectId("63891a76136dd44526e03e84"), true)
console.log(notif)

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

const routes = getRoutes(services)

for (const routeName in routes) {
    const route = routes[routeName]
    if(route[0] === "GET"){
      app.get('/' + routeName, (req, res) => {
        route[1](req, res);
      })
    }
    else {
      app.post('/' + routeName, (req, res) => {
        route[1](req, res);
      })
    }
      
  }

app.listen(port, () => {
  console.log(`Server launched and listening to port ${port}`)
})