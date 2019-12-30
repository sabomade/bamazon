USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("camera","electronics",499.99,20),
	("chips","food",3.99,200),
	("apples","food",1.00,350),
    ("jeans","clothing",69.79,50),
    ("sneakers","footwear",35.00,47),
    ("paint","crafts",5.00,25),
    ("detergent","cleaning",17.99,60),
    ("lotion","health and beuaty",15.00,32),
    ("shampoo","health and beauty",5.00,30),
    ("clue","games and toys",25.00,14);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("electronics",10000),
	("food",15000),
	("crafts",3000);
    
SELECT * FROM products;

SELECT * FROM departments;