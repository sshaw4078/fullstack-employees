import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();
export default router;

const REQUIRED = ["name", "birthday", "salary"];

function hasRequiredFields(body) {
  return REQUIRED.every(
    (field) => body[field] !== undefined && body[field] !== null
  );
}

function isValidId(id) {
  return /^\d+$/.test(id);
}

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");
  if (!hasRequiredFields(req.body))
    return res
      .status(400)
      .send("Request body must include name, birthday, and salary.");

  const { name, birthday, salary } = req.body;
  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(404).send("Employee not found.");

  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee not found.");
  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(404).send("Employee not found.");

  const employee = await deleteEmployee(id);
  if (!employee) return res.status(404).send("Employee not found.");
  res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");
  if (!hasRequiredFields(req.body))
    return res
      .status(400)
      .send("Request body must include name, birthday, and salary.");

  const { id } = req.params;
  if (!isValidId(id)) return res.status(404).send("Employee not found.");

  const { name, birthday, salary } = req.body;
  const employee = await updateEmployee({ id, name, birthday, salary });
  if (!employee) return res.status(404).send("Employee not found.");
  res.status(200).send(employee);
});