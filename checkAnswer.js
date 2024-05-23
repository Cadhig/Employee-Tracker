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
    useAnswers: function (answer) {
        console.log('you chose:', answer)
    },
    runAnswers: async function (answer) {
        await client.connect()
        try {
            const obj = {
                'View all departments': 'SELECT * FROM department',
                'View all roles': 'SELECT * FROM role',
                'View all employees': 'SELECT * FROM employee',
                'Add department': `UPDATE departments SET deptname = ${answer.value}`,
                'Add a role': `UPDATE role SET title = ${answer.value} SET salary = ${answer.value}`,
                'Add an employee': `UPDATE employee SET first_name = ${answer.value} last_name = ${answer.value} role_id = ${answer.value}`,
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

    }
}


