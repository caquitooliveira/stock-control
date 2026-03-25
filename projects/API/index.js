const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 🔧 MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(express.json());

// =========================
// 🗂️ CATEGORIES (MOCK)
const categories = [
  { id: 1, name: "Informática" },
  { id: 2, name: "Games" }
];

// =========================
// 📦 PRODUCTS (MOCK)
let products = [
  {
    id: 1,
    name: "Notebook Dell",
    amount: 10,
    price: 3500,
    description: "Notebook i5 8GB RAM SSD",
    category: { id: 1, name: "Informática" }
  },
  {
    id: 2,
    name: "PC Gamer",
    amount: 5,
    price: 7000,
    description: "Ryzen 7 + RTX 4060",
    category: { id: 1, name: "Informática" }
  },
  {
    id: 3,
    name: "PlayStation 5",
    amount: 3,
    price: 4500,
    description: "Console Sony PS5",
    category: { id: 2, name: "Games" }
  }
];

// =========================
// 🧪 TESTE
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// =========================
// 📦 PRODUCTS
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price, description, category_id, amount } = req.body;

  const category = categories.find(c => c.id == category_id);

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
    amount,
    category
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description, category_id, amount } = req.body;

  const productIndex = products.findIndex(p => p.id == id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  const category = categories.find(c => c.id == category_id);

  products[productIndex] = {
    id: Number(id),
    name,
    price,
    description,
    amount,
    category
  };

  res.status(200).json(products[productIndex]);
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  products = products.filter(p => p.id != id);

  res.status(200).json({ message: "Produto deletado" });
});

// =========================
// 🗂️ CATEGORIES
app.get("/api/categories", (req, res) => {
  res.status(200).json(categories);
});

app.post("/api/categories", (req, res) => {
  const { name } = req.body;

  const newCategory = {
    id: categories.length + 1,
    name
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
});

app.put("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const categoryIndex = categories.findIndex(c => c.id == id);

  if (categoryIndex === -1) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }

  categories[categoryIndex].name = name;

  res.status(200).json(categories[categoryIndex]);
});

// 🚀 START
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
