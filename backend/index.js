import express from 'express'
import cors from 'cors'
import getRoutes from './routes/index.js'
import 'dotenv/config'
import UsersService from './services/UsersService.js'
import NotifsService from './services/NotifsService.js'

import { MongoClient, ObjectId } from 'mongodb'
import Notif from './model/Notif.js'

const uri ="mongodb://20.111.50.245:27017/"
const database = new MongoClient(uri).db("mongolDB")

const userService = new UsersService(database)
const notifService = new NotifsService(database, userService)

const services = {
    "users" : userService,
    "notifs" : notifService
}

// let user = await userService.getUserByID("63891a76136dd44526e03e84")
// console.log(user)

// await notifService.createNotifForOneUser("63891a76136dd44526e03e84", new Notif("BZ BZ BZ BZ BZ BZ", 2, "WASSIMOUNET", 3))

let result = await notifService.readAllNotifs("63891a76136dd44526e03e84")
// console.log(result)

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

const routes = getRoutes(services)

for (let i = 0; i < routes.length; i++) {
  const route = routes[i]
    if (route.needAuthent) {
      // TODO Authent
    } 
    if(route.method === "GET"){
      app.get('/' + route.path, (req, res) => {
        route.callback(req, res)
      })
    }
    else {
      app.post('/' + route.path, (req, res) => {
        route.callback(req, res)
      })
    }
      
  }

app.listen(port, () => {
  console.log(`Server launched and listening to port ${port}`)
})