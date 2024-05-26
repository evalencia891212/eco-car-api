import { query } from "express";
import { pool } from "../db.js";


export const getVehicles = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM vehicles where active =1");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" + error.message });
    }
  };

  export const getVehiclesByRoute = async (req, res) => {
    const { route_id } = req.params;
    try {
      const [rows] = await pool.query(`select 
                                          * 
                                       from vehicles v
                                       inner join vehicles_routes vr on v.vehicle_id = vr.vehicle_id 
                                      where vr.route_id = ? and v.active = 1`,[route_id]);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" + error.message });
    }
  };

  export const createVehicle = async (req, res) => {
    try {
      //const { name, salary } = req.body;
       const { serial_number, licence_plate,vehicle_status,private_company, model_id,route_id, active } = req.body; 
       const [rows] = await pool.query(
         'INSERT INTO vehicles (serial_number, licence_plate,vehicle_status,private_company, model_id,route_id, active) ' 
          +' VALUES( ?, ?, ? , ?, ?, ?,?)',
         [serial_number, licence_plate,vehicle_status,private_company, model_id,route_id, active ]
       );

       const [insertedRow] = await pool.query("SELECT * FROM vehicles WHERE vehicle_id = ?", [
        rows.insertId
      ]);

       res.json(insertedRow);
      
     } catch (error) {
      console.log(error.message);
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
    //console.log(req.body);
    //res.send("Succes")
  };

  export const getVehicleEmployeeTour = async (req,res) => {
    try {
      const {vehicle_id} = req.params
      let query = `SELECT 
                    vte.vehicle_tour_employee_id,
                    e.employee_number, 
                    e.vehicle_id,
                    e.employee_id,concat(name , ' ' , e.last_name) as name ,
                    vte.vehicle_id, 
                    vte.status, 
                    vte.station_id
                  FROM vehicle_tour_employee vte
                  INNER join employees e on e.employee_id = vte.employee_id 
                  WHERE vte.vehicle_id = ?`
       console.log(query)           
      const [row] = await pool.query(query, [vehicle_id]);

      res.json(row);
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  }

  export const removeVehicleEmployeeTour = async(req,res) => {
    try {
      const{employee_id,vehicle_id,station_id} = req.body;
      
      const [drow] = await pool.query(`DELETE FROM vehicle_tour_employee WHERE employee_id = ? and vehicle_id = ? and station_id = ?`,
         [employee_id, vehicle_id ,station_id ]
       );

       let query = `SELECT 
                    vte.vehicle_tour_employee_id,
                    e.employee_number, 
                    e.vehicle_id,
                    e.employee_id,concat(name , ' ' , e.last_name) as name ,
                    vte.vehicle_id, 
                    vte.status, 
                    vte.station_id
                  FROM vehicle_tour_employee vte
                  INNER join employees e on e.employee_id = vte.employee_id 
                  WHERE vte.vehicle_id = ?`
       console.log(query)           
      const [row] = await pool.query(query, [vehicle_id]);

      res.json(row);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
    
  }

  export const createVehicleEmployee  = async (req, res) => {
    try {
      //const { name, salary } = req.body;
       const { employee_id, vehicle_id ,station_id} = req.body; 
       const [rows] = await pool.query(
        `INSERT INTO vehicle_tour_employee
        (employee_id, vehicle_id, station_id)
        VALUES( ?, ?, ?)`,
         [employee_id, vehicle_id ,station_id ]
       );

       const [insertedRow] = await pool.query(`SELECT vehicle_tour_employee_id, e.employee_number, e.employee_id,concat(name , ' ' , e.last_name) as name , vte.vehicle_id, vte.status, vte.station_id
                                                FROM vehicle_tour_employee vte
                                                INNER join employees e on e.employee_id = vte.employee_id 
                                               WHERE vehicle_tour_employee_id = ?`, [rows.insertId]);

       res.json(insertedRow);
      
     } catch (error) {
      console.log(error.message);
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
    //console.log(req.body);
    //res.send("Succes")
  };




  export const deleteVehicle = async (req, res) => {
    try {
      const { vehicle_id } = req.params;
      const [rows] = await pool.query("UPDATE vehicles set active=0 WHERE vehicle_id = ?", [vehicle_id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message  });
    }
  };

  export const updateVehicle = async (req, res) => {
    try {
      const { vehicle_id } = req.params;
      const { serial_number, licence_plate,vehicle_status,private_company, model_id,route_id, active  } = req.body;
  
      var query = `UPDATE vehicles SET serial_number = IFNULL(?, serial_number), 
                    licence_plate = IFNULL(?, licence_plate),  
                    vehicle_status = IFNULL(?, vehicle_status),
                    private_company = IFNULL(?, private_company),
                    model_id = IFNULL(?, model_id), 
                    route_id = IFNULL(?, route_id),  
                    active = IFNULL(?, active) 
                  WHERE vehicle_id = ?`

      console.log(query);
      const [result] = await pool.query(query,
        [serial_number, licence_plate,vehicle_status,private_company, model_id,route_id,active, vehicle_id]
      );


      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Vehicle not found" });
  
      const [rows] = await pool.query("SELECT * FROM vehicles WHERE vehicle_id = ? ", [
        vehicle_id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  
export const getAvailableVehicles = async (req, res) => {
  try {
    const [rows] = await pool.query( `select * from vehicles v 
                                      where v.vehicle_id not in(select vehicle_id from employees e where e.vehicle_id <> 0) 
                                      and active=1`);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error.message });
  }
};

export const openIssue = async (req,res) => {
  try {
    const { vehicle_id, description} = req.body;  
    console.log(description)
    const [rows] = await pool.query( `INSERT INTO vehicle_issues (vehicle_id, description) VALUES(?, ?)`, [vehicle_id,description]);

    const [insertedRow] = await pool.query(`SELECT *
                                            FROM vehicle_issues where vehicle_issue_id=?`, [rows.insertId]);
          
    res.json(insertedRow);


  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error.message });    
  }

}


export const getIssue = async (req,res) => {
  try {
    const { vehicle_id} = req.params;  

    const [rows] = await pool.query(`SELECT * FROM vehicle_issues where vehicle_id=? and status=1`, [vehicle_id]);
          
    res.json(rows);


  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error.message });    
  }

}

export const closeIssue = async (req,res) => {
  try {
    const { vehicle_id} = req.params;  
    const {vehicle_issue_id} = req.params;
  
    const [rows] = await pool.query(`UPDATE vehicle_issues
                                    SET status=0
                                    WHERE vehicle_id=? and vehicle_issue_id =?`, [vehicle_id,vehicle_issue_id]);
          
    res.json(rows);


  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error.message });    
  }

}