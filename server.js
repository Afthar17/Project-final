import express from 'express'
import dotenv from 'dotenv'
import webhooksRoutes from './routes/webhooksRoute.js'


dotenv.config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api', webhooksRoutes);

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})
