import * as express from "express";
import { Prisma, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
const app = express();
app.use(express.json());

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

app.get("/", async (req, res) => {
  // res.send("Express + TypeScript Server");
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const { email, name, posts, role } = req.body;
    const user: User = await prisma.user.create({
      data: {
        email,
        name,
        role,
        posts: {
          create: posts.map((post) => ({
            title: post.title,
            published: post.published
          }))
        }
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user: User = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        posts: true
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user: User = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user: User = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    });

    res.json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2014" || error.code === "P2003") {
        console.log(error.message);
      }
      res.status(500).json({ error });
    }
  }
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on("error", console.error);
