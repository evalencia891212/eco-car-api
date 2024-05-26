import { pool } from "../db.js";

export const getRoutes = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM routes where active = 1");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  export const createRoute = async (req, res) => {
    try {
       const {  route_name } = req.body; 
       const [rows] = await pool.query(
         'INSERT INTO routes (route_name) ' 
          +' VALUES(?)',
         [ route_name ]
       );

       const [insertedRow] = await pool.query("SELECT * FROM routes WHERE route_id = ?", [
        rows.insertId
      ]);

       res.json(insertedRow);

       
     } catch (error) {
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
     }
  };


  export const deleteRoute = async (req, res) => {
    try {
      const { route_id } = req.params;
      const [result] = await pool.query("UPDATE routes set active=0 WHERE route_id = ?", [route_id]);
  
      if (result.affectedRows <= 0) {
        return res.status(404).json({ message: "Route not found" });
      }

       const [rows] = await pool.query("SELECT * FROM routes WHERE active = 1", [
        route_id,
       ]);

       res.json(rows);
  
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const updateRoute = async (req, res) => {
    try {
      const { route_id } = req.params;
      const { route_name } = req.body;

      const [result] = await pool.query(
        'UPDATE routes SET route_name = IFNULL(?, route_name), ' 
        + ' active = 1 '
        + '  WHERE route_id = ?',
        [route_name, route_id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Route not found" });
  
      const [rows] = await pool.query("SELECT * FROM routes WHERE route_id = ? ", [
        route_id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  