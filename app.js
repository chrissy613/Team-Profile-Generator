const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function appMenu() {
    function createManager() {
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?", 
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager's office number?",
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      team.push(manager);
      createTeam();
    });
  }

  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "addNew",
        message: "Would you like to add a new team member?",
        choices: [
          "Add Engineer",
          "Add Intern",
          "No"
        ]
      }
    ]).then(selection => {
      switch(selection.addNew) {
      case "Add Engineer":
        addEngineer();
        break;
      case "Add Intern":
        addIntern();
        break;
      default:
        createHtmlFile();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      team.push(engineer);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      team.push(intern);
      createTeam();
    });
  }

  function createHtmlFile() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team));
    console.log("Your team.html file has been created in the output folder!")
  }
  createManager();
}

appMenu();