const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { useAnswers, runAnswers } = require('./checkAnswer')

async function runPrompt(answer) {
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
            break;
        }
        runAnswers(answers.questions)
        useAnswers(answers.questions)
    }
}

runPrompt();