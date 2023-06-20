import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbconnect.js";
import productRouter from "./router/product.js";
import webhookRouter from "./router/webhook.js"
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use('/product', productRouter)
app.use('/api', webhookRouter)


app.listen(PORT, () => {
  console.log(`Server listenning on port: ${PORT}`);
  connectDB();
});