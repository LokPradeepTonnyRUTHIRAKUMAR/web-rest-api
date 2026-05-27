import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let users = [];

// CREATE
app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    ...req.body,
  };

  users.push(user);
  res.status(201).json(user);
});

// READ ALL
app.get("/users", (req, res) => {
  res.json(users);
});

// READ ONE
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    ...users[index],
    ...req.body,
  };

  res.json(users[index]);
});

// DELETE
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));

  res.json({ message: "User deleted" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});