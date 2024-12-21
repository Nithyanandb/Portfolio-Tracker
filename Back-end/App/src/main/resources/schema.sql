create database portfolio_tracker;

use portfolio_tracker;

CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, 
	password VARCHAR(255) NOT NULL,
    role varchar(255)  NOT NULL
);

CREATE TABLE portfolio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,          
    description TEXT                 
);

CREATE TABLE stock (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,            
    symbol VARCHAR(10) NOT NULL,                     
    quantity INT NOT NULL,                           
    purchase_Price DECIMAL(15, 2) NOT NULL,          
    current_Price DECIMAL(15, 2),                    
    profit_Loss DECIMAL(15, 2),                      
    portfolio_Id BIGINT NOT NULL,                    
    purchase_Date DATETIME NOT NULL,                 
    updated_Date DATETIME NOT NULL,                  
    exchange VARCHAR(50),                            
    sector VARCHAR(50),                              
    day_Change_Percentage DECIMAL(5, 2),             
    type VARCHAR(20) NOT NULL,                       
    CONSTRAINT fk_portfolio FOREIGN KEY (portfolio_Id) REFERENCES portfolio(id) 
);

