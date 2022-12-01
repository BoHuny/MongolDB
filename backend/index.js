import express from 'express'
import cors from 'cors'
import getRoutes from './routes/index.js'
import 'dotenv/config'


const app = express()
const port = process.env.PORT

app.use(cors())

const routes = getRoutes()
for (const routeName in routes) {
    app.get('/' + routeName, (req, res) => {
        routes[routeName](req, res);
    })
  }

app.listen(port, () => {
  console.log(`Server launched and listening to port ${port}`)
})