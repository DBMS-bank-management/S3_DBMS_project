/* ORGANIZATION */
CREATE TABLE IF NOT EXISTS branch (
    branch_ID VARCHAR(10),
    br_name VARCHAR(20),
    location VARCHAR(20),
    PRIMARY KEY (branch_ID)
);

CREATE TABLE IF NOT EXISTS account_plan (
    plan_ID VARCHAR(5),
    type VARCHAR(10),
    withdrawal_count NUMERIC(2, 0),
    min_amount NUMERIC(10, 2),
    PRIMARY KEY(plan_ID)
);

CREATE TABLE IF NOT EXISTS fd_plan (
    plan_ID varchar(10) PRIMARY KEY,
    duration integer(3),
    interest decimal(5, 3)
);

CREATE TABLE IF NOT EXISTS loan_plan (
    plan_ID VARCHAR(10),
    interest NUMERIC(5, 3),
    duration NUMERIC(5, 3),
    PRIMARY KEY(plan_ID)
);

CREATE TABLE IF NOT EXISTS trans_mode(
    mode_ID integer auto_increment,
    fee numeric (5, 2),
    PRIMARY KEY(mode_ID)
);

/* AUTHENTICATION TABLES */
CREATE TABLE IF NOT EXISTS auth (
    auth_ID varchar(10),
    password varchar(20),
    role varchar(10),
    primary key (auth_ID)
);

CREATE TABLE IF NOT EXISTS activity_log (
    log_ID integer NOT NULL AUTO_INCREMENT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    auth_id varchar(10),
    action varchar(100),
    PRIMARY KEY (log_ID),
    FOREIGN KEY (auth_id) REFERENCES auth(auth_ID)
);

CREATE TABLE IF NOT EXISTS customer (
    ID VARCHAR(10),
    name VARCHAR(100),
    type VARCHAR(10),
    auth_ID VARCHAR(10),
    contact_no VARCHAR(10),
    primary key (ID),
    foreign key (auth_ID) references auth(auth_ID)
);

CREATE TABLE IF NOT EXISTS employee (
    emp_ID VARCHAR(10),
    emp_name VARCHAR(100),
    branch_ID VARCHAR(10),
    Is_manager BIT,
    auth_ID VARCHAR(10),
    PRIMARY KEY(emp_ID),
    FOREIGN KEY(branch_ID) REFERENCES branch(branch_ID),
    FOREIGN KEY(auth_ID) REFERENCES auth(auth_ID)
);

CREATE TABLE IF NOT EXISTS account (
    account_ID VARCHAR(10),
    branch_ID VARCHAR(10),
    balance NUMERIC(15, 2),
    plan_ID VARCHAR(10),
    customer_ID VARCHAR(10),
    PRIMARY KEY(account_ID),
    FOREIGN KEY (branch_ID) REFERENCES branch(branch_ID),
    FOREIGN KEY (plan_ID) REFERENCES loan_plan(plan_ID),
    FOREIGN KEY (customer_ID) REFERENCES customer (ID)
);

CREATE TABLE IF NOT EXISTS fixed_deposit (
    fd_ID VARCHAR(10),
    acc_ID VARCHAR(10),
    start_date DATE,
    amount NUMERIC(15, 2),
    plan_ID VARCHAR(10),
    PRIMARY KEY (fd_ID),
    FOREIGN KEY (acc_ID) REFERENCES account(account_ID),
    FOREIGN KEY(plan_ID) REFERENCES fd_plan(plan_ID)
);

CREATE TABLE IF NOT EXISTS loan (
    loan_ID VARCHAR(10),
    acc_ID VARCHAR (10),
    amount NUMERIC (15, 2),
    plan_ID VARCHAR(10),
    PRIMARY KEY (loan_ID),
    FOREIGN KEY (acc_ID) REFERENCES account(account_ID),
    FOREIGN KEY (plan_ID) REFERENCES loan_plan (plan_ID)
);

CREATE TABLE IF NOT EXISTS normal_application (
    app_ID VARCHAR(10),
    branch_ID VARCHAR(10),
    acc_ID VARCHAR(10),
    amount NUMERIC(15, 2),
    is_approved BIT,
    app_date DATE,
    loan_ID VARCHAR(10),
    PRIMARY KEY (app_ID),
    FOREIGN KEY(branch_ID) REFERENCES branch(branch_ID),
    FOREIGN KEY(acc_ID) REFERENCES account(account_ID),
    FOREIGN KEY(loan_ID) REFERENCES loan(loan_ID)
);

CREATE TABLE IF NOT EXISTS online_application (
    app_ID VARCHAR(10),
    fd_ID VARCHAR(10),
    acc_ID VARCHAR(10),
    amount NUMERIC(15, 2),
    app_date DATE,
    loan_ID VARCHAR(10),
    PRIMARY KEY (app_ID),
    FOREIGN KEY(fd_ID) REFERENCES fixed_deposit(fd_ID),
    FOREIGN KEY(acc_ID) REFERENCES account(account_ID),
    FOREIGN KEY(loan_ID) REFERENCES loan(loan_ID)
);

CREATE TABLE IF NOT EXISTS transaction(
    trans_ID integer auto_increment,
    amount decimal(15, 2),
    mode_ID integer,
    acc_ID varchar(10),
    description varchar(20),
    PRIMARY KEY (trans_ID),
    FOREIGN KEY (mode_ID) REFERENCES trans_mode(mode_ID),
    FOREIGN KEY (acc_ID) REFERENCES account(account_ID)
);

CREATE TABLE IF NOT EXISTS installment (
    inst_ID VARCHAR(10),
    loan_ID VARCHAR(10),
    amount NUMERIC(15, 2),
    due_date DATE,
    is_paid BIT,
    trans_ID integer(10),
    PRIMARY KEY (inst_ID),
    FOREIGN KEY(loan_ID) REFERENCES loan(loan_ID),
    FOREIGN KEY(trans_ID) REFERENCES transaction(trans_ID)
);