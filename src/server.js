import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js"; 
import brandRoutes from './routes/brandRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (_, res) => {
  res.send("Still alive!");
});

app.use("/api/orders", orderRoutes); 
app.use('/api/brands', brandRoutes);
app.use('/api/reviews', reviewRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
