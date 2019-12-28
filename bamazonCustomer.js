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
    port: 3306,

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
// C - create/change products

// R - read products
function readProducts(){
    console.log("Displaying all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products",
    function(err, res){
        if (err) throw err;
       // console.log(res);

        //create table to display all products
        var t = new Table;

        //add each product to table
        res.forEach(product => {
            t.cell("Item ID", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Price, USD", product.price, Table.number(2));
            t.newRow();
        });
        //print table to screen
        console.log(t.toString());

        //call order products
        orderProducts(res);
    });
}

// U - update products
function updateProducts(product, userOrder){
    console.log("\nUpdating ", product[0].product_name, "...\n");
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: product[0].stock_quantity - userOrder
            },
            {
                item_id: product[0].item_id
            }
        ], function(err, res){
            if(err) throw err;
            console.log("\n"+res.affectedRows + " products updated!\n");
        }
    );
}

// D - delete products

// order products as a customer
function orderProducts(allProducts){
    // get user input, check input against database, update database if necessary
    inquirer.prompt([
        {
            type: "rawlist",
            name: "choice",
            choices: function(){
                var choiceArray = [];
                for (let index = 0; index < allProducts.length; index++) {
                    choiceArray.push(allProducts[index].product_name);
                }
                return choiceArray;
            },
            message: "Which product would you like to purchase?"
        },
        {
            type: "input",
            name: "quantityToPurchase",
            message: "How many of this item do you wish to purchase?"
        },
    ]).then(function(item){
        var userOrder = parseInt(item.quantityToPurchase);
        connection.query(
            "SELECT * FROM products WHERE ?",
            {   
                product_name: item.choice,
            },
            function(err, product){
                //console.log(product);
                if(err){ throw err;}
                else if (userOrder <= product[0].stock_quantity){
                    //update database
                    updateProducts(product, userOrder);

                    //console log total cost for customer
                    const totalCost = product[0].price * parseInt(item.quantityToPurchase);
                    //console.log("totalCost:", totalCost)
                    console.log("Your purchase of", product[0].product_name, "was successful. Your total cost is $"+totalCost);
                }
                else{
                    console.log("Insufficient Quantity")
                }
                connection.end();
            }
        );
    })
}


//-------------------
// MAIN PROCESS
//-------------------
connection.connect(function(err){
    if (err) throw err;
    //a connection was made to database
    console.log("connected as id " + connection.threadId + "\n");
    
    //display all products
    readProducts();

});