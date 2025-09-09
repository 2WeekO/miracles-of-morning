import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();


app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;