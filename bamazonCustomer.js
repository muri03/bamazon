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

var stock = [];


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
    }]).then(function(answer){

         connection.query('SELECT * FROM products WHERE id =' + answer.stockNumber, function(error, results, fields) {
                if (error) throw error;
                //id.push(data.id);
                stock.push(results[0].stock_quantity);
                //price.push(results[0].price);
      })
        insertItem(answer.name, answer.stockNumber);

     
    });
}
function checkOut(){
      inquirer.prompt([
      {
        name: 'stockNumber',
        message: 'How many units would you like to purchase?'
    }]).then(function(answer){
           if (answer.stockNumber > stock[0] ){
           console.log('Insufficient quantity!' + '\n' + 'We only have ' + stock[0] + ' units in stock'), goBack();
         }else {  }
        
      })

}

function goBack() {
  inquirer.prompt([{
      type: "confirm",
      name: "yn",
      message: 'Would you like to go back?',
      choices: ["Choice A", new inquirer.Separator(), "choice B"]

  }]).then(function(data) {
      if (data.yn == true) {
          displayDb();
      } else {
          console.log('Bye Bye, Come back soon!'), connection.end();
      }
  });


}
