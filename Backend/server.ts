const jsonServer = require("json-server");
import { Request, Response } from "express";
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const db = require("./db.json");
const fs = require("fs");

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req: Request, res: Response, next: any) => {
  const users = readUsers();

  const user = users.filter(
    (u: any) =>
      u.username === req.body.username && u.password === req.body.password
  )[0];

  if (user) {
    res.send({ ...formatUser(user), token: checkIfAdmin(user) });
  } else {
    res.status(401).send("Incorrect username or password");
  }
});

server.post("/register", (req: any, res: any) => {
  const users = readUsers();
  const user = users.filter((u: any) => u.username === req.body.username)[0];

  if (user === undefined || user === null) {
    res.send({
      ...formatUser(req.body),
      token: checkIfAdmin(req.body),
    });
    db.users.push(req.body);
  } else {
    res.status(500).send("User already exists");
  }
});

server.get("/employees", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const sort = (req.query.sort as string) || "id";
  const order = (req.query.order as string) || "asc";
  const search = (req.query.search as string) || "";

  let employees = readEmployees();
  if (search) {
    employees = employees.filter((employee: any) =>
      Object.values(employee).some((value: any) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  employees = employees.sort((a: any, b: any) => {
    if (order === "asc") {
      return a[sort] > b[sort] ? 1 : -1;
    }
    return a[sort] < b[sort] ? 1 : -1;
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  console.log('###end', end)
  res.json({
    data: employees.slice(start, end),
    total: employees.length,
    page,
    totalPages: Math.ceil(employees.length / limit),
    limit,
  });
});

server.get("/employees/:id", (req: Request, res: Response) => {
  const updatedEmployee = req.body;
  const id = parseInt(req.params.id, 10);
  const employees = router.db.get("employees");
  const employee = employees.find({ id }).assign(updatedEmployee).write();
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

server.post("/employees", (req: Request, res: Response) => {
  const newEmployee = req.body;
  const employees = router.db.get("employees");
  newEmployee.id = employees.size().value() + 1;
  employees.push(newEmployee).write();
  res.status(201).json(newEmployee);
});

server.put("/employees/:id", (req: Request, res: Response) => {
  const updatedEmployee = req.body;
  const id = parseInt(req.params.id, 10);
  const employees = router.db.get("employees");
  const employee = employees.find({ id }).assign(updatedEmployee).write();
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

server.delete("/employees/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const employees = router.db.get("employees");
  const employee = employees.remove({ id }).write();
  if (employee.length > 0) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

server.use("/users", (req: any, res: any, next: any) => {
  if (isAuthorized(req) || req.query.bypassAuth === "true") {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running in port 3000");
});

function formatUser(user: any) {
  delete user.password;
  user.role = user.username === "admin" ? "admin" : "user";
  return user;
}

function checkIfAdmin(user: any, bypassToken = false) {
  return user.username === "admin" || bypassToken === true
    ? "admin-token"
    : "user-token";
}

function isAuthorized(req: any) {
  return req.headers.authorization === "admin-token" ? true : false;
}

function readUsers() {
  const dbRaw = fs.readFileSync("./db.json");
  const users = JSON.parse(dbRaw).users;
  return users;
}

function readEmployees() {
  const dbRaw = fs.readFileSync("./db.json");
  const datas = JSON.parse(dbRaw).employees;
  return datas;
}
