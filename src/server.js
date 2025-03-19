import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import orderRoutes from "./routes/orderRoutes.js"; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); 

app.use("/api/orders", orderRoutes); 

app.get("/", (req, res) => {
  res.send("Orders API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});