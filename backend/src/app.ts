import express from 'express';
import routes from './routes'



const app = express();

// app.use(cors({
//     origin: "*"
// }))

app.use(express.json());

app.use("/api", routes);

app.get("/health", (req,res) =>{
       res.send("health is good of server");
})

app.get("/", (req,res) =>{
      res.send("hello");
})


export {app};