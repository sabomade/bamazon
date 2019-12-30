//-------------------
// NPM PACKAGES
//-------------------
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');

//-------------------
// DATABASE SETUP
//-------------------
var connection = mysql.createConnection({
    host: 'localhost',
    
    //port
    port: 3307,

    //username
    user: "root",
    //password
    password:"root",

    //database
    database: "bamazon"
});

//-------------------
// FUNCTIONS
//-------------------
// C - create new department
function addDepartment(){
    console.log("Let's add a new department...\n");
    inquirer.prompt([
        {
            type:"input",
            name: "department_name",
            message: "What is the name of the department you're adding?"       
        }
    ]).then(function(newDept){
        connection.query(
            "INSERT INTO departments (department_name) VALUES (?)", 
            [
                {
                    department_name: newDept.department_name,
                }
            ],function(err, res){
                if(err) throw err;
                console.log("\n"+res.affectedRows + " products added!\n");
            }
        );
    });
}

// R - View Product Sales by Department
function viewProductSales(department){
    console.log("Displaying all products in "+ department +" Department...\n");
    // connection.query("SELECT item_id, product_name, price, stock_quantity, product_sales FROM products",
    // function(err, res){
    //     if (err) throw err;
    //    // console.log(res);

    //     //create table to display all products
    //     var t = new Table;

    //     //add each product to table
    //     res.forEach(product => {
    //         t.cell("Item ID", product.item_id);
    //         t.cell("Product Name", product.product_name);
    //         t.cell("Price, USD", product.price, Table.number(2));
    //         t.cell("Quantity in Stock", product.stock_quantity);
    //         t.newRow();
    //     });
    //     //print table to screen
    //     console.log(t.toString());
    //     connection.end();
    // });
}

// ask manager what task to perform upon start of program
function start(){
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices:["View Product Sales by Department", "Create New Department", "EXIT"]
    }).then(function(answer){
        if(answer.option === "View Product Sales by Department"){
            viewProductSales(answer.option);
        }else if(answer.option === "Create New Department"){
            addDepartment();
        }else if(answer.option === "EXIT"){
            connection.end();
        }
    });
}

//-------------------
// MAIN PROCESS
//-------------------
connection.connect(function(err){
    if (err) throw err;
    //a connection was made to database
    console.log("connected as id " + connection.threadId + "\n");
    
    //start
    start();
});