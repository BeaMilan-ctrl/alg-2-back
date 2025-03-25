import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

const port = 3000;

app.get("/notas", async (req, res) => {
  let notas = [];

  if (req.query) {
    notas = await prisma.notas.findMany({
      where: {
        title: req.query.title,
        description: req.query.description,
        deadline: req.query.deadline,
      },
    });
  } else {
    notas = await prisma.notas.findMany();
  }

  res.status(200).json(notas);
});

app.post("/notas", async (req, res) => {
  const new_nota = await prisma.notas.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
    },
  });

  res.status(201).json(new_nota);
});

app.put("/notas/:id", async (req, res) => {
  const { id } = req.params;

  const updated_nota = await prisma.notas.update({
    data: {
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
    },
    where: {
      id
    }
  });

  res.status(200).json(updated_nota);
});

app.delete("/notas/:id", async (req, res) => {
  const {id} = req.params;

  const deleted_nota = await prisma.notas.delete({
    where: {
      id
    }
  });

  res.status(200).json(deleted_nota);
})

app.listen(port, () => {
  console.log(`Server iniciado na porta ${port}`);
});
