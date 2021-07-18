import express, { Application, Request, Response } from 'express'

import routes from './api/routes'
import dbInit from './db/init'

dbInit()

const app: Application = express()
const port = 3000

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` })
})

app.use('/api/v1', routes)

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error) {
    console.log(`Error occurred: ${error.message}`)
}
