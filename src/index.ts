import express from 'express'
import { AppDataSource } from './data-source'
import { env } from './env'
import { routes } from './routes'

AppDataSource.initialize().then(() => {
  const app = express()
  
  app.use(express.json())

  app.use(routes)

  return app.listen(env.PORT, () => {
    console.log('HTTP Server Running!')
  })
})