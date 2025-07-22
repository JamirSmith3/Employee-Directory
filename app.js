import express from "express";
import employeeRouter from "./routes/employees.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeeRouter);

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

export default app;
