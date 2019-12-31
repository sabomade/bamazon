# bamazon
An Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

### Demos 
`node bamazonCustomer.js` lets the Customer select a product and quanity to buy.
![bamazonCustomer demo](demos/bamazonCustomer.gif)
If the quantity chosen is available, the app will complete the purchase and display total cost.  The app then updates the product's stock & total sales quantities in the MYSQL database.  If quantity chosen is not available, the app displays a message to customer that the stock is not available.

`node bamazonManager.js` lets the Manager do several different tasks: view products for sale, view low inventory, add inventory, and add a new product.
![bamazonManager demo](demos/bamazonManager.gif)
**view products for sale** displays a list of all products in the database, their price, and quantity in stock
**view low inventory** displays a list of all products with less than 5 quantity in stock
**add inventory** lets the Manager choose an item and add to it's stock
**add new product** lets the Manager add a new product to the database, requiring a department, price, and quantity in stock

`node bamazonSupervisor.js` lets the Supervisor do several tasks: view sales by department & add new department
![bamazonSupervisor demo](demos/bamazonSupervisor.gif)
**view sales by department** displays a table of all departments, their over head costs, total product sales, and profits
**add new department** lets the Supervisor add a new department to the database, requiring a name, defaults over head cost to 1000

### How to Run
This app is employed using a localhost MySQL server and node in the terminal. Make sure you are connecting to localhost:3307. Start server, download all files, open in terminal and type any of the following commands to run:
`node bamazonCustomer.js`
`node bamazonManager.js`
`node bamazonSupervisor.js`

## Built With
* MySQL
* Javascript

## Versioning & Author
This is the only version and is maintained by me, [sabomade](https://github.com/sabomade).

## Acknowledgements
Built & completed as part of the UCB Coding Bootcamp, Homework 12: Node.js & MySQL
