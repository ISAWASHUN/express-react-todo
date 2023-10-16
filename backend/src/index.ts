import { PrismaClient } from "@prisma/client";
import express from "express"

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos)
})

app.post("/todos",async (req, res) => {
  const todo = await prisma.todo.create({
    data: {
      title: req.body.title,
      completed: req.body.completed || false
    }
  })
  res.json(todo)
})

app.listen(4000, () => {
  console.log('Server is running on port 4000');
})