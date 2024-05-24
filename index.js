
const inquirer = require('inquirer')
const { runAnswers } = require('./checkAnswer')
const client = require('./connection')

async function runPrompt(answer) {
    await client.connect()
    let deptAnswer;
    let roleAnswer;
    let employeeAnswer;
    let deptList = await client.query('SELECT * FROM department');
    let roleList = await client.query('SELECT * FROM role')
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do?:',
                choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add a role", "Add an employee", "Update an employee role", "Exit"],
                name: 'questions'
            },
        ]);
        if (answers.name === 'Exit') {
            console.log('Exiting...');
            await client.end()
            process.exit()
        }
        if (answers.questions === 'Add department') {
            deptAnswer = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'Enter department name',
                    name: 'deptName'
                }
            ])
        }
        if (answers.questions === 'Add a role') {
            roleAnswer = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'Enter role name',
                    name: 'roleName'
                },
                {
                    type: 'input',
                    message: 'Enter role salary (no decimals or commas)',
                    name: 'roleSalary'
                },
                {
                    type: 'list',
                    message: 'What department does it belong to?',
                    name: 'roleDept',
                    choices: deptList.rows.map(department => department.deptname)
                },
            ])
        }
        if (answers.questions === 'Add an employee') {
            employeeAnswer = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'Enter employee first name',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'Enter employee last name',
                    name: 'lastName'
                },
                {
                    type: 'list',
                    message: 'Enter employee role',
                    name: 'employeeRole',
                    choices: roleList.rows.map(role => role.title)
                },
            ])
        }
        runAnswers(answers.questions, deptAnswer?.deptName, roleAnswer?.roleName, roleAnswer?.roleSalary, roleAnswer?.roleDept, employeeAnswer?.firstName, employeeAnswer?.lastName, employeeAnswer?.employeeRole)

    }
}


runPrompt();