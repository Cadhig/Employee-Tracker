require('dotenv').config()
const pg = require('pg')
const { Client } = pg
const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE,
})

module.exports = {
    runAnswers: async function (answer, deptAnswer, roleName, roleSalary, roleDept, employeeFirstName, employeeLastName, employeeRole) {
        await client.connect()
        try {
            let selectRoleDept;
            let selectEmployeeRole;
            let selectManagerId;
            if (answer === 'Add a role') {
                selectRoleDept = await client.query(`SELECT id FROM department WHERE deptname = '${roleDept}'`)
            }
            if (answer === 'Add an employee') {
                selectEmployeeRole = await client.query(`SELECT id, department_id FROM role WHERE title = '${employeeRole}'`)
                selectManagerId = await client.query(`SELECT employee.id 
                FROM employee 
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON department.id = role.department_id
                WHERE employee.manager_id IS NULL
                AND department.id = '${selectEmployeeRole?.rows[0]?.department_id}'`)
            }
            const obj = {
                'View all departments': 'SELECT * FROM department',
                'View all roles': 'SELECT * FROM role',
                'View all employees': 'SELECT * FROM employee',
                'Add department': `INSERT INTO department("deptname") VALUES ('${deptAnswer}')`,
                'Add a role': `INSERT INTO role ("title", "salary","department_id") VALUES('${roleName}', '${roleSalary}', '${selectRoleDept?.rows[0]?.id}')`,
                'Add an employee': `INSERT INTO employee("first_name","last_name","role_id","manager_id") VALUES('${employeeFirstName}','${employeeLastName}','${selectEmployeeRole?.rows[0]?.id}', '${selectManagerId?.rows[0]?.id}')`,
                'Update an employee role': 'w',//add this
            }
            const res = await client.query(obj[answer])
            console.log(res.rows)
        }
        catch (err) {
            console.error(err);
        } finally {
            await client.end()
        }
    },
}


