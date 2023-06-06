import { dataFetcher } from "../utils/db.js";




// complexni json formatda  company bilan ciqarish
const company = `
SELECT 
        c.*,
    JSON_AGG(
         json_build_object(
        'id', com.complex_id,
        'name', com.complex_name
        )
    ) complex
FROM 
    companies c
NATURAL JOIN complex com
WHERE c.company_id = $1
GROUP BY
    c.company_id;
`;


//  roomlarni json formatda complex bilan chiqarish
const complex = `
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
WHERE c.complex_id = $1
GROUP BY c.complex_id;
`;

// roomni yarm qiymatini chiqarish bitta object qaytadi
const room = `
SELECT 
   r.price / r.kv price,
   r.kv,
   r.room,
   c.address
FROM 
    rooms r
NATURAL JOIN complex c
WHERE r.room_id = $1;
`;




//  get one bank
const getbank = ` select * from  banks where bank_id =$1; `;
//  get bitta user
const getuser = ` select * from  users where user_id =$1; `;


//     SELECT 
//     * 
// FROM 
//     banks b 
// WHERE 
//     b.bank_id =  (SELECT bank((SELECT (price) from rooms where room_id = $1)));


//  canlulator bankni 17 foizga bo'liw qanchadur oyga to'lash
const calc = `
SELECT
    bank_id,
    bank_name,
    limit_cost,
(SELECT price from rooms where room_id = $1) price,
(SELECT price from rooms where room_id = $1) * 0.17 starting_payment,
(SELECT price from rooms where room_id = $1) * 0.83 / $2 / 12 monthly_payment,
    $2 bank_duration
FROM
    banks
WHERE
    bank_id = $3;`;



//     SELECT
//     bank_id,
//     bank_name,
//     limit_cost,
// (SELECT price from rooms where room_id = $1) price,
// (SELECT price from rooms where room_id = $1) * 0.17 starting_payment,
// (SELECT price from rooms where room_id = $1) * 0.83 / $2 / 12 monthly_payment,
//     $2 bank_duration
// FROM
//     banks
// WHERE
//     bank_id = (SELECT bank((SELECT price from rooms where room_id = $1)));


// hamma companiyani olish
const Allcompany = `SELECT * FROM companies order by company_id ;`;
//  hamma complexni oliw
const allComplex = `SELECT * FROM complex; `;
//  hamma roomni olish
const allRoom = `SELECT  * FROM rooms; `;

// hamma banklarni olish
const allBank = ` select * from  banks ;`;
// hamma userlarni olish
const allUser= ` select * from  users ;`;
//  componiya yaratish
const postcompany = `INSERT INTO  companies(company_name, company_img)  VALUES ($1, $2);`;
//  complex yaratish
const postcomplex = `INSERT INTO complex (complex_name, address, company_id) VALUES ($1, $2, $3); `;
//  xona yaratish
const postroom = `INSERT INTO  rooms(room, price, kv, complex_id)  VALUES ($1, $2,$3, $4) RETURNING *; `;
// bank yaratish
const postbank = `INSERT INTO banks (bank_name, started_paymant, limit_cost,year) VALUES ($1, $2, $3,$4); `;
//  componiya ocirish
const deletecompany = `DELETE FROM companies WHERE company_id = $1;`;
//  complex ocirish
const deletecomplex = `DELETE FROM complex WHERE complex_id = $1;`;
//  xonani ochirish
const deleteroom = `DELETE FROM rooms WHERE room_id = $1;`;
// bank ochirish
const deletebank = `DELETE FROM banks WHERE bank_id = $1;`;
//user ochirish
const deleteuser = `DELETE FROM users WHERE user_id = $1;`;
//  componiya yangilash
const putcompany = `UPDATE companies SET company_name=$1, company_img=$2 WHERE company_id = $3 RETURNING *;`;
//  complexni yangilash
const putcomplex = `UPDATE complex SET complex_name = $1, address = $2 WHERE complex_id = $3 RETURNING *;`;
//  xonani yangilash
const putroom = `UPDATE rooms SET room = $1, kv = $2, price = $3 WHERE room_id = $4 RETURNING *;`;
// bank yangilash
const putbank = `UPDATE banks SET bank_name = $1, started_paymant = $2, limit_cost = $3, year=$4  WHERE bank_id=$5 RETURNING *;`;
//user yangilash
const putuser = `UPDATE users SET  user_name = $1, user_password = $2, email = $3 WHERE user_id = $4 RETURNING *;`;

//  login qilish
const login = `SELECT * FROM users WHERE email = $1;`; 
//  registratisiya qilish
const register = `INSERT INTO users( user_name, email,user_password) VALUES ($1, $2, $3);`;
//  admin registratisiya qilish
const adminregister = `INSERT INTO users( user_name, email,user_password,role) VALUES ($1, $2, $3,$4);`;





//  functionlar dataFetcherni ichiga yuboriladi ,query va params
const userLogin = (...email) => dataFetcher(login,email);
const userRegister = (...params) => dataFetcher(register,params);
const adminRegister = (...params) => dataFetcher(adminregister,params);
const getCompAll = () => dataFetcher(Allcompany);
const getComplexs = () => dataFetcher(allComplex);
const getRooms = () => dataFetcher(allRoom);
const getBanks = () => dataFetcher(allBank);
const getUsers = () => dataFetcher(allUser);
const postCompany = ( ...params) => dataFetcher(postcompany, params);
const postRoom = (...params) => dataFetcher(postroom, ...params);
const postComplex = (...params) => dataFetcher(postcomplex, params);
const postBank = (...params) => dataFetcher(postbank, params);
const deleteCompany = (id) => dataFetcher(deletecompany, id);
const deleteComplex = (id) => dataFetcher(deletecomplex, id);
const deleteRoom = (id) => dataFetcher(deleteroom, id);
const deleteBank = (id) => dataFetcher(deletebank, id);
const deleteUser = (id) => dataFetcher(deleteuser, id);
const putCompany = (...params) => dataFetcher(putcompany,params);
const putComplex = (...params) => dataFetcher(putcomplex,params);
const putRoom=(...params)=> dataFetcher(putroom,params)
const putBank=(...params)=> dataFetcher(putbank,params)
const putUser=(...params)=> dataFetcher(putuser,params)

const getComp = (id) => dataFetcher(company, id);
const getComplex = (id) => dataFetcher(complex, id);
const getRoom = (id) => dataFetcher(room, id);
const getBank = (id) => dataFetcher(getbank, id);
const getUser = (id) => dataFetcher(getuser, id);
const getCalc = (...params) => dataFetcher(calc, params);

export {
  getComp,
  getCompAll,
  getComplex,
  getRoom,
  getBank,
  getCalc,
  getComplexs,
  getRooms,
  postCompany,
  deleteCompany,
  postComplex,
  deleteComplex,
  deleteRoom,
  postRoom,
  userLogin,
  userRegister,
  putCompany,
  putComplex,
  putRoom,
  adminRegister,
  getBanks,
  getUser,
  getUsers,
  deleteBank,
  deleteUser,
  putBank,
  putUser,
  postBank
};
