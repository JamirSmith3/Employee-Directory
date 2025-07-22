import { Router } from "express";
import employees from "#db/employees";

const router = Router();

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = employees.find((e) => e.id === id);
  if (!found) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json(found);
});

router.post("/", (req, res) => {
  const { name } = req.body || {};
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  const newId =
    employees.length === 0
      ? 1
      : Math.max(...employees.map((e) => e.id)) + 1;

  const newEmployee = { id: newId, name: name.trim() };
  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});

export default router;
