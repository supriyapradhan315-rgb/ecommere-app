import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Products API
app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Nike Shoes",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Headphones",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    },
  ]);
});

// Home route
app.get("/", (req, res) => {
  res.send("E-Commerce API Running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});