const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { prompt } = require("inquirer");
const Employee = require("./lib/Employee");

// array of questions for user
const initialQuestion = [
  {
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "employeeType",
    choices: ["Manager", "Engineer", "Intern", "I have no more team members"],
  },
];

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
      }
    })
    .catch((err) => console.log(err));
}

function managerQuestions() {
  inquirer
    .prompt(managerQuestionsArr)
    .then((response) => {
      new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      init();
    })
    .catch((err) => console.log(err));
}

function engineerQuestions() {
    inquirer
      .prompt(engineerQuestionsArr)
      .then((response) => {
        new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );
        init();
      })
      .catch((err) => console.log(err));
  }

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
