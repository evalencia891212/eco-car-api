
import { pool } from "../db.js";

export const getCO2ByEmployees = async (req,res) => {
    try {
      const [rows] = await pool.query("CALL globalCo2()");
      console.log(rows);
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

  };

 export const getToursInfo = async (req,res) => {

  var startDate = req.query.startDate + ' 00:00:01';
  var endDate = req.query.endDate + ' 23:59:59';
  console.log(startDate + ', ' + endDate);
  console.log(`CALL getToursInfo('${startDate}','${endDate}')` )
  try {
    const [rows] = await pool.query(`CALL getToursInfo('${startDate}','${endDate}')`);
    console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
 };