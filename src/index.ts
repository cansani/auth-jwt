import express from 'express'
import { AppDataSource } from './data-source'
import 'express-async-errors'
import { env } from './env'
import { routes } from './routes'
import { errorMiddleware } from './middlewares/error'

AppDataSource.initialize().then(() => {
  const app = express()
  
  app.use(express.json())

  app.use(routes)

  app.use(errorMiddleware)

  return app.listen(env.PORT, () => {
    console.log('HTTP Server Running!')
  })
})