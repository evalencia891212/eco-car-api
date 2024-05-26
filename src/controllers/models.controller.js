import { pool } from "../db.js";

export const getModels = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM models where active = 1");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };


  export const getModelById = async (req, res) => {
    try {
      const { model_id } = req.params;
      const [rows] = await pool.query("SELECT * FROM models where model_id = ? and active = 1",[model_id]);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  
  export const createModel = async (req, res) => {
    try {
       const {  model_year, model_name, performance, pasenger_capability, co2_emissions } = req.body; 
       const [rows] = await pool.query(
         'INSERT INTO models ( model_year, model_name, performance, pasenger_capability, co2_emissions) ' 
          +' VALUES(?,?,?,?,?)',
         [ model_year, model_name, performance, pasenger_capability, co2_emissions ]
       );

       const [insertedRow] = await pool.query("SELECT * FROM models WHERE model_id = ?", [
        rows.insertId
      ]);

       res.json(insertedRow);

       
     } catch (error) {
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const updateModel = async (req, res) => {
    try {
      const { model_id } = req.params;
      const { model_year, model_name, performance, pasenger_capability, co2_emissions} = req.body;
  
    

      const [result] = await pool.query(
        'UPDATE models SET model_year = IFNULL(?, model_year), ' 
        + ' model_name = IFNULL(?, model_name), '
        + ' performance = IFNULL(?, performance), '  
        + ' pasenger_capability = IFNULL(?, pasenger_capability), '
        + ' co2_emissions = IFNULL(?, co2_emissions), '
        + ' active = 1 '
        + '  WHERE model_id = ?',
        [model_year, model_name, performance, pasenger_capability, co2_emissions, model_id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Model not found" });
  
      const [rows] = await pool.query("SELECT * FROM models WHERE model_id = ? ", [
        model_id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const deleteModel = async (req, res) => {
    try {
      const { model_id } = req.params;
      const [rows] = await pool.query("UPDATE models set active=0 WHERE model_id = ?", [model_id]);
  
      const [activerows] = await pool.query("SELECT * FROM models WHERE active = 1", [
        employee_id,
      ]);

      res.json(activerows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message  });
    }
  };
