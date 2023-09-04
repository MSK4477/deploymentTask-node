import express from "express"
import DbToConnect from "./db_utils/dbConnect.js"
import cors from "cors"   
import userRouter from "./router/user.js"
 const app = express()
 app.use(cors())

 app.use(express.json())

 await DbToConnect()

    const PORT = 4000
app.use("/api/user", userRouter )

app.listen(PORT, () => console.log ( "listening on port", PORT))