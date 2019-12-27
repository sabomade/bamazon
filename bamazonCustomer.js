//require mysql
var mysql = require("mysql");

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

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
})

//-------------------
// C - create products
//-------------------

//-------------------
// R - read products
//-------------------
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
        connection.end();
    });
}
//-------------------
// U - update products
//-------------------

//-------------------
// D - delete products
//-------------------