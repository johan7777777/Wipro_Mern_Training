import express from "express";
import cors from "cors";
import { requestLogger } from "../../userstory1/middleware/requestLogger.js";
import { validateStudent } from "../../userstory2/middleware/validateStudent.js";
import { morganLogger } from "../../userstory4/middleware/morganLogger.js";
import { jsonParser, urlencodedParser } from "../../userstory3/middleware/bodyParser.js";

const app = express();
const PORT = 3001;

app.use(cors());
// User Story 3: Built-in middleware for body parsing (JSON + form submissions)
app.use(jsonParser);
app.use(urlencodedParser);
app.use(requestLogger); // User Story 1: Log every request before any route executes
app.use(morganLogger); // User Story 4: morgan in dev mode - status code & response time

let students = [];

// User Story 2: Student routes with validation middleware
app.post("/students", validateStudent, (req, res) => {
  const { name, email } = req.body;
  const newStudent = {
    id: students.length + 1,
    name: String(name),
    email: String(email),
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(students);
});

let products = [
  { id: 1, name: "Rice", price: 80, category: "Grocery" },
  { id: 2, name: "Soap", price: 25, category: "Personal Care" },
  { id: 3, name: "Shampoo", price: 120, category: "Personal Care" },
  { id: 4, name: "Oil", price: 150, category: "Grocery" }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: "Name and category are required" });
  }
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    id: newId,
    name: String(name),
    price: Number(price) || 0,
    category: String(category)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
