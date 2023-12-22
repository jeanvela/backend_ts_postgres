import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index'
import { options } from './config/corsConfig'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors(options))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/v1', router)

export default app