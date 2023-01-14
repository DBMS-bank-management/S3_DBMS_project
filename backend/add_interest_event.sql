CREATE EVENT update_interest
    ON SCHEDULE EVERY 1 MONTH
    STARTS '2023-01-01 00:00:00'
    DO
      UPDATE account a
      SET balance = balance + balance * (select interest from account_plan where plan_ID = a.plan_ID) / 1200
      WHERE DATEDIFF(CURDATE(), createdDate) % 30 = 0;

ALTER EVENT add_interest
    ENABLE;