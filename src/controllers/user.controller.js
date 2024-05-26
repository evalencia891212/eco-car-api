import { pool } from "../db.js";

export const getUser = async (req, res) => {
    const { user_name,password } = req.params;
    try {
      const [rows] = await pool.query("SELECT * FROM users where user_name= ? and password = ? and active =1",[user_name,password]);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createUser = async (req, res) => {
    try {
      const { employee_id } = req.params;
       const { user_name, password, typer_id } = req.body; 
      
       const [rows] = await pool.query(
         'INSERT INTO users ( user_name, password, typer_id) ' 
          +' VALUES(?,?,?)',
         [ user_name, password, typer_id  ]
       );

       const [insertedRow] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
        rows.insertId
      ]);

      const [result] = await pool.query(`UPDATE employees
                                          SET user_id=?
                                          WHERE employee_id=?;`, [rows.insertId, employee_id]);

       res.json(insertedRow);

       
     } catch (error) {
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const getAvailableUserList = async (req, res) => {
    try {
      const [rows] = await pool.query( `select * from users u
                                        where u.user_id not in (select user_id from employees e WHERE e.user_id <> 0)
                                        and u.active = 1`);

      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };




