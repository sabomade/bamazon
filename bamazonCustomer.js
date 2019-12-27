//-------------------
// NPM PACKAGES
//-------------------
var mysql = require("mysql");
var inquirer = require("inquirer");

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
        //console.log(res);
        console.log ("-------------------------------");
        console.log("| item_id |", " product_name ", "| price |");
        console.log ("-------------------------------");
        Object.keys(res).forEach(function(key) {
            var row = res[key];
            console.log("| ",row.item_id, "| ", row.product_name, "| ",row.price,"|");
        });
        console.log ("-------------------------------");
        //connection.end();
    });
}

// U - update products

// D - delete products


//-------------------
// MAIN PROCESS
//-------------------
connection.connect(function(err){
    if (err) throw err;
    //a connection was made to database
    console.log("connected as id " + connection.threadId + "\n");
    
    //display all products
    readProducts();

    // get user input, check input against database, update database if necessary
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the item_id of the product you'd like to purchase?"
        },
        {
            type: "input",
            name: "quantityToPurchase",
            message: "How many do you want to purchase?"
        },
    ]).then(function(item){
        connection.query(
            "SELECT * FROM products WHERE ?",
            {   
                item_id: item.id,
            },
            function(err, product){
                //console.log(product);
                if(err){ throw err;}
                else if (parseInt(item.quantityToPurchase) <= product[0].stock_quantity){
                    //update database

                    //console log total cost for customer
                    const totalCost = product[0].price * parseInt(item.quantityToPurchase);
                    console.log("totalCost:", totalCost)
                    console.log("Your purchase of", product[0].product_name, "was successful. Your total cost is", totalCost);
                }
                else{
                    console.log("Insufficient Quantity")
                    connection.end();
                }
                
            }
        );
    })
    
})