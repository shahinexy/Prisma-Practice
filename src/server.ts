import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express with Prisma & TypeScript!");
});

// 🔹 Create a New User
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (error: any) {
    console.error("Prisma Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// create post
app.post("/post", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const result = await prisma.post.create({ data });
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Prisma Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get all Post
app.get("/post", async (req, res) => {
  const users = await prisma.post.findMany({
    include: { user: true },
  });
  res.json(users);
});

// delete post
app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

// update post
app.patch("/post/:id", async (req, res) => {
  const { id } = req.params;
const data = req.body

  try {
    const updatedPost = await prisma.post.update({
        where: {id: id},
        data: data,
      });
      
    res.json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Prisma Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
