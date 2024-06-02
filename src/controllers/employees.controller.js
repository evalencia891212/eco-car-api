
import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM employees where active =1");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  export const getEmployeeByNumber = async (req, res) => {
    try {
      const { employee_number } = req.params;
      const { vehicle_id } = req.params;
      const [rows] = await pool.query(`SELECT * FROM employees e
                                      inner join vehicle_tour_employee vte on vte.employee_id = e.employee_id
                                      where employee_number = ? and vte.vehicle_id = ? and active =1`,[employee_number,vehicle_id]);
      res.json({message:'ok',data:rows});
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" + error.message });
    }
  };

  export const getEmployeeVehicleByNumber = async (req, res) => {
    try {
      const { employee_number } = req.params;
      const [rows] = await pool.query(` select * 
                                          from employees e 
                                        where e.employee_id not in (select employee_id  from vehicle_tour_employee vte) and e.employee_number = ? and e.active = 1 `,[employee_number]);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" + error.message });
    }
  };

 

  export const createEmployee = async (req, res) => {
    try {
      //const { name, salary } = req.body;
       const {employee_number,
              name ,
              last_name , 
              mother_lastname, 
              neighborhood, 
              city,
              street_name , 
              outdoor_number, 
              interior_number,
              vehicle_id,
              company_mail,
              personal_mail,
              location ,
              place_id ,
              office_distance
            } = req.body; 


       const [rows] = await pool.query(
          `INSERT INTO employees (
            employee_number, 
            name, 
            last_name, 
            mother_lastname, 
            neighborhood, 
            city,
            street_name, 
            outdoor_number, 
            interior_number, 
            vehicle_id,
            company_mail, 
            personal_mail, 
            location, 
            place_id,
            office_distance,
            active)  
           VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ? ,?, ?)`,
         [employee_number,
          name , 
          last_name , 
          mother_lastname, 
          neighborhood, 
          city,
          street_name , 
          outdoor_number, 
          interior_number,
          vehicle_id,
          company_mail,
          personal_mail,
          location, 
          place_id,
          office_distance,
          1 ]
       );

       const [insertedRow] = await pool.query("SELECT * FROM employees WHERE employee_id = ?", [
        rows.insertId
      ]);

       res.json(insertedRow);

     } catch (error) {
       return res.status(500).json({ message: "Something goes wrong" + error.message });
    }
    //console.log(req.body);
    //res.send("Succes")
  };

  export const deleteEmployee = async (req, res) => {
    try {
      const { employee_id } = req.params;
      const [result] = await pool.query("UPDATE employees set active=0 WHERE employee_id = ?", [employee_id]);
  
      if (result.affectedRows <= 0) {
        return res.status(404).json({ message: "Employee not found" });
      }

       const [rows] = await pool.query("SELECT * FROM employees WHERE active = 1", [
         employee_id,
       ]);

       res.json(rows);
  
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const updateEmployee = async (req, res) => {
    try {
      const { employee_id } = req.params;
      const { employee_number,name , last_name , mother_lastname, neighborhood ,street_name , outdoor_number, vehicle_id,interior_number,company_mail,personal_mail,location,place_id,office_distance ,active  } = req.body;
  
      const [result] = await pool.query(
        'UPDATE employees SET employee_number = IFNULL(?, employee_number), '
        + ' name = IFNULL(?, name), ' 
        + ' last_name = IFNULL(?, last_name), ' 
        + ' mother_lastname = IFNULL(?, mother_lastname), ' 
        + ' neighborhood = IFNULL(?, neighborhood), '
        + ' street_name = IFNULL(?, street_name), ' 
        + ' outdoor_number = IFNULL(?, outdoor_number), '
        + ' vehicle_id = IFNULL(?, vehicle_id), '
        + ' interior_number = IFNULL(?, interior_number), '
        + ' company_mail = IFNULL(?, company_mail), '
        + ' personal_mail = IFNULL(?, personal_mail), '
        + ' location = IFNULL(?, location), '
        + ' place_id = IFNULL(?, place_id), '
        + ' office_distance = IFNULL(?, office_distance), '
        + ' active = IFNULL(?, active) '
        + '  WHERE employee_id = ?',
        [employee_number, name,last_name,mother_lastname,neighborhood,street_name,outdoor_number,vehicle_id,interior_number,company_mail,personal_mail,location,place_id,office_distance,active, employee_id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Employee not found" });
  
      const [rows] = await pool.query("SELECT * FROM employees WHERE employee_id = ?", [
        employee_id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong" + error.message});
    }
  };

  export const getEmployeesLatLng = async (req, res) => {

    try {
      const [rows] = await pool.query("SELECT * FROM employees e where location <> '' and location <> 0 and active <> 0");
  
      res.json(rows);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }

  }

  export const getEmployeInfoVehicleByUser = async (req, res) =>{

    const { user_id } = req.params;

    try {

      var query = `select 
                    e.employee_id,
                    e.employee_number,
                    concat(e.name,' ',e.last_name) as employee_name,
                    v.vehicle_id ,
                    m.model_name,
                    v.licence_plate,
                    r.route_id,
                    vr.vehicle_route_id,
                    r.route_name 
                  from employees e 
                  left join vehicles v on v.vehicle_id = e.vehicle_id 
                  left join vehicles_routes vr on v.vehicle_id = vr.vehicle_id 
                  left join routes r on vr.route_id = r.route_id 
                  left join models m on m.model_id = v.model_id 
                  where e.user_id  = ?`
      const [rows] = await pool.query(query,[user_id]);
  
      res.json(rows);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }

    
      
  }

  export const getPassengerInfoVehicleByUser = async (req, res) =>{

    const { user_id } = req.params;

    try {

      var query = `select 
                    e.employee_id,
                    e.employee_number,
                    concat(e.name,' ',e.last_name) as employee_name
                  from employees e 
                  where e.user_id  = ?`
      const [rows] = await pool.query(query,[user_id]);
  
      res.json(rows);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }   
  }

  