CREATE DATABASE exam;

CREATE TABLE companies(
    company_id bigserial not null primary key,
    company_name varchar(64) not null,
    company_img text
);

-- bitta compni chiqarish
SELECT  * FROM  companies c WHERE c.company_id = 1;



INSERT INTO companies(company_name) VALUES('Nest One'),
                                          ('Tashkent City'), 
                                          ('Murad Buildings');
                                         
CREATE TABLE complex(
    complex_id bigserial not null primary key,
    complex_name varchar(64) not null,
    address varchar(64) not null,
    company_id INT NOT NULL, FOREIGN KEY(company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

-- bitta complexni chiqarish
SELECT  * FROM  complex  WHERE complex_id = 3 ;

-- complex qowiw qaysidur componiyani idga
                                                                    
INSERT INTO complex(complex_name, address, company_id) 
VALUES 
('Complex A', '123 Main St', 1),
('Complex B', '456 Elm St', 2),
('Complex C', '789 Oak St', 3);
                                
CREATE TABLE rooms(
    room_id bigserial not null primary key,
    room int not null,
    price bigint not null,
    kv int not null,
    complex_id INT NOT NULL, FOREIGN KEY(complex_id) REFERENCES complex(complex_id) ON DELETE CASCADE
);


--  xona qowiw qaysidur complexni idsiga
INSERT INTO rooms(room, complex_id, price, kv) VALUES (2, 1, 600000, 40),    
                                                      (2, 2, 4000000, 45),   
                                                      (4, 2, 61000000, 70), 
                                                      (6, 2, 63000000, 90),
                                                      (6, 3, 700000, 90),
                                                      (4, 1, 613000000, 70),
                                                      (6, 3, 100000, 90);
-- bank 
CREATE TABLE banks(
    bank_id bigserial not null primary key,
    bank_name varchar(64) not null,
    started_paymant int not null,
    limit_cost int not null,
    year int not null
);

-- bankga value tayorlaw
INSERT INTO banks(bank_name, started_paymant, limit_cost, year) VALUES ('Asaka', 17, 61000000, 10), ('Ipak Yuli', 17, 700000000, 15), ('Hamkor', 17, 500000000 ,10);



--   componiyaga  tegishli complexlar
SELECT  c.*, JSON_AGG(
         json_build_object(
        'id', com.complex_id,
        'name', com.complex_name
        )
    ) complex
FROM  companies c NATURAL JOIN complex com WHERE c.company_id = 2 GROUP BY  c.company_id ;





--  complexga tegishli xonalar xonani id va neca xona ekanligi
SELECT 
    c.complex_id,
    c.complex_name,
    JSON_AGG(
        json_build_object(
        r.room_id,
        r.room
        )
    ) room
FROM 
    rooms r
NATURAL JOIN complex c
WHERE c.complex_id = 2
GROUP BY c.complex_id
;    





-- roomga tegishli malumot va qaysi complex ekanligi

SELECT 
    r
FROM 
    complex c
NATURAL JOIN rooms r
WHERE c.complex_id = 3
;


--   complexga teshli xonalar ro'yxati nomi kvsi  id va narxi xonaga tegishli ko'proq malumot
SELECT 
    c.complex_id,
    c.complex_name,
    JSON_AGG(
        (
       r.*
        )
    ) room
FROM 
    rooms r
NATURAL JOIN complex c
WHERE c.complex_id = 3
GROUP BY c.complex_id;


--  xona summasini yarmi chiqarish

SELECT 
   r.price / r.kv price,
   r.kv,
   c.address
FROM 
    rooms r
NATURAL JOIN complex c
WHERE r.room_id = 2
;











--  user table

CREATE TABLE users (
  user_id bigserial not null PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(10) DEFAULT 'client'
);
INSERT INTO users ( user_name, user_password, email, role)
VALUES (
  'eshmat',
  'toshmat123',
  'eshmatosh@example.com',
  'admin'
);
-- user qowiw
INSERT INTO users ( user_name, user_password, email)
VALUES ( 'johndoe', 'password123', 'johnedoe@example.com');


-- faqat bitta admin boliwi kere degan function
CREATE OR REPLACE FUNCTION check_admin_user() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'admin' AND EXISTS (SELECT 1 FROM users WHERE role = 'admin') THEN
    RAISE EXCEPTION 'An admin user already exists';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER admin_user_trigger BEFORE INSERT ON users
FOR EACH ROW EXECUTE FUNCTION check_admin_user();






--   bankda to'lov

CREATE OR REPLACE FUNCTION bank(price int)
RETURNS INT
LANGUAGE plpgsql
AS
$$
DECLARE
result int;
h record;
BEGIN
    result = -1;
    FOR h in SELECT bank_id, limit_cost FROM banks ORDER BY limit_cost
    LOOP
        IF
            h.limit_cost >= price AND result = -1
        THEN
            result = h.bank_id;
        END IF;
    END LOOP;
    RETURN result;
END
$$;
-- for asaka bank
SELECT
    bank_id,
    bank_name,
    limit_cost,
    (SELECT price from rooms where room_id = 3) price,
    (SELECT price from rooms where room_id = 3) * 0.19 starting_payment,
    (SELECT price from rooms where room_id = 3) * 0.83 / 10 / 12 monthly_payment
FROM
    banks
WHERE
    bank_id = 1;

--  for  hamkor bank




--  10 yildagi
SELECT
    bank_id,
    bank_name,
    limit_cost,
(SELECT price from rooms where room_id = 2) price,
(SELECT price from rooms where room_id = 2) * 0.17 starting_payment,
(SELECT price from rooms where room_id = 2) * 0.83 / 10 / 12 monthly_payment,
    10 bank_duration
FROM
    banks
WHERE
    bank_id = 3;

    
    --  15 yildagi
SELECT
    bank_id,
    bank_name,
    limit_cost,
(SELECT price from rooms where room_id = 2) price,
(SELECT price from rooms where room_id = 2) * 0.17 starting_payment,
(SELECT price from rooms where room_id = 2) * 0.83 / 15 / 12 monthly_payment,
    15 bank_duration
FROM
    banks
WHERE
    bank_id = 3;
    



--  bank cmd yozish ucun 
        SELECT
    bank_id,
    bank_name,
    limit_cost,
(SELECT price from rooms where room_id = 2) price,
(SELECT price from rooms where room_id = 2) * 0.17 starting_payment,
(SELECT price from rooms where room_id = 2) * 0.83 / 5 / 12 monthly_payment,
    5 bank_duration
FROM
    banks
WHERE
    bank_id = 2;






--  room id ,complex name ,company name 






--  SELECT t1.room_id, t2.complex_name, t3.company_name
-- FROM rooms AS t1
-- INNER JOIN complex AS t2
--     ON t1.complex_id = t2.complex_id
-- INNER JOIN company AS t3
--     ON t2.complex_id = t3.company_id where t1.room_id=1;






    
--  SELECT t1.room_id, t2.*
-- FROM rooms AS t1
-- NATURAL JOIN complex AS t2 where room_id =2;


 select MIN(price) as min,MAX(price) as max,AVG(price) as avg,SUM(price) as sum from rooms ;

 
--  select MAX(price) from rooms;
--  select AVG(price) from rooms;
--  select SUM(price) from rooms;