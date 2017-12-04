var mysql = require('mysql');

var promptly = require('promptly');

var inquirer = require('inquirer');

var connection = mysql.createConnection({
  hoset: "localhost",
  port: 3306,
  user: "root",
  password: "tesla",
  database: "bamazonDB"

});

// When connecting to database will throw error if unable, call displayDb()
connection.connect(function(err){
  if (err) throw err;
  displayDb();
});

//  Displays database for customer
function displayDb() {
    connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price $" + res[i].price + " | Stock Count: " + res[i].stock_quantity);  
    };
    console.log("-----------------------------------");
    whatItem();
    })
  }

function whatItem(){
    inquirer.prompt([
    {
        name: 'name',
        message: 'Which item number would you like to purchase?'
    },
    {
        name: 'stockNumber',
        message: 'How many units would you like to puchase?'
    },
    ]).then(function(answer){
        insertItem(answer.name, answer.stockNumber);
    });
}


