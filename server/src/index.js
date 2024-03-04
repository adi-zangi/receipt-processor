/**
 * Entry point of the receipt processor web service
 * @author Adi Zangi
 */

import express from "express"
import router from "./routes.js"

const app = express()
const port = 3000

app
.use(express.json())
.use(router)
.listen(port, () => {
   console.log(`Listening on http://localhost:${port}`)
})