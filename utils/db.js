import pkg from "pg";
const { Pool } = pkg;

//  sqlga ulash
const pool = new Pool({
  connectionString: "postgres://gbowcjzc:LVM92WZGoGAnWdT5I28z67ibtbDU3g78@drona.db.elephantsql.com/gbowcjzc",
});



//  sqlda read qilib kelish
const dataFetcher = async (sql, data) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(sql, data);
    return rows;
  } finally {
    client.release();
  }
};

export { dataFetcher };
