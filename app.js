// REQUIREMENTS
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const { prompt } = require("inquirer");
const Employee = require("./lib/Employee");

// OUTPUT PATHS
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// EMPTY EMPLOYEE ARRAYS
const employees = [];

// QUESTION ARRAYS FOR USER
// INIT QUESTION
const initialQuestion = [
  {
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "employeeType",
    choices: ["Manager", "Engineer", "Intern", "I have no more team members"],
  },
];
// MANAGER QUESTIONS
const managerQuestionsArr = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your manager's id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your manager's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "officeNumber",
  },
];
// ENGINEER QUESTIONS
const engineerQuestionsArr = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your engineer's id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your engineer's github username?",
    name: "github",
  },
];
// INTERN QUESTIONS
const internQuestionsArr = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your intern's id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What school does your intern go to?",
    name: "school",
  },
];
// INIT FUNCTION TO ASK FIRST QUESTION
function init() {
  inquirer
    .prompt(initialQuestion)
    .then((answer) => {
      if (answer.employeeType === "Manager") {
        managerQuestions();
      } else if (answer.employeeType === "Engineer") {
        engineerQuestions();
      } else if (answer.employeeType === "Intern") {
        internQuestions();
      } else {
        // console.log(employees);
        fs.writeFile(outputPath, render(employees), (err) => {
          if (err) throw err;
          console.log("Successfully wrote file.");
        });
      }
    })
    .catch((err) => console.log(err));
}
// FUNCTION TO ASK QUESTIONS IF MANAGER IS SELECTED
function managerQuestions() {
  inquirer
    .prompt(managerQuestionsArr)
    .then((response) => {
      employees.push(
        new Manager(
          response.name,
          response.id,
          response.email,
          response.officeNumber
        )
      );
      init();
    })
    .catch((err) => console.log(err));
}
// FUNCTION TO ASK QUESTIONS IF ENGINEER IS SELECTED
function engineerQuestions() {
  inquirer
    .prompt(engineerQuestionsArr)
    .then((response) => {
      employees.push(
        new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        )
      );
      init();
    })
    .catch((err) => console.log(err));
}
// FUNCTION TO ASK QUESTIONS IF INTERN IS SELECTED
function internQuestions() {
  inquirer
    .prompt(internQuestionsArr)
    .then((response) => {
      employees.push(
        new Intern(response.name, response.id, response.email, response.school)
      );
      init();
    })
    .catch((err) => console.log(err));
}
// INITIAL MESSAGE FOR USER
console.log("Please enter your team information.")
// CALL TO INITIALIZE QUESTIONS
init();
