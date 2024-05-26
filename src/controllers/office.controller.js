import { pool } from "../db.js";

export const getOffice = async (req,res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM branch_offices where active = 1");
      console.log(rows);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }

  };