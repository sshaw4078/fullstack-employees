import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1985-03-12", salary: 72000 },
    { name: "Bob Smith", birthday: "1990-07-25", salary: 65000 },
    { name: "Carol Martinez", birthday: "1988-11-02", salary: 81000 },
    { name: "David Lee", birthday: "1979-01-30", salary: 95000 },
    { name: "Emma Brown", birthday: "1993-05-17", salary: 58000 },
    { name: "Frank Wilson", birthday: "1982-09-08", salary: 77000 },
    { name: "Grace Kim", birthday: "1995-12-21", salary: 62000 },
    { name: "Henry Davis", birthday: "1987-04-14", salary: 69000 },
    { name: "Isabel Garcia", birthday: "1991-08-03", salary: 74000 },
    { name: "Jack Thompson", birthday: "1976-06-19", salary: 102000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}
