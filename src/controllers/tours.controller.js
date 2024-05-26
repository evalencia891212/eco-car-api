import { pool } from "../db.js";

export const startTour = async (req, res) => {
    try {
      
       const {  veicle_route_id  ,start_odometer } = req.body; 
      
       const [rows] = await pool.query(
         'INSERT INTO tours ( veicle_route_id, start_date_time,start_odometer ) ' 
          +' VALUES(?,now(),?)',
         [ veicle_route_id, start_odometer  ]
       );

       const [insertedRow] = await pool.query("SELECT * FROM tours WHERE tour_id = ?", [
        rows.insertId
      ]);


       res.json(insertedRow);

       
     } catch (error) {
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const endTour = async(req,res) => {

    const { tour_id,end_odometer,tour_lenght } = req.body; 


    try {

      const [rows] = await pool.query(
        `
        UPDATE tours
        SET  end_date_time=now(), 
             end_odometer=IFNULL(?, end_odometer), 
             tour_lenght=IFNULL(?, tour_lenght)
        WHERE tour_id=?
        `,
        [  end_odometer, tour_lenght, tour_id ]
      );

      const [insertedRow] = await pool.query("SELECT * FROM tours WHERE tour_id = ?", [
        tour_id
      ]);
      res.json(insertedRow);
      
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
    

  }

  export const addEmployee = async(req,res) =>{
    try {
      const { employee_id,tour_id } = req.body;
      const [rows] = await pool.query(`INSERT INTO tour_detail
                                        ( tour_id, employee_id, active)
                                      VALUES( ?, ?, 1);`,[tour_id,employee_id]);

     const [insertedRow] = await pool.query("SELECT * FROM tour_detail WHERE tour_detail_id = ?", [
        rows.insertId
      ]);
      console.log(rows.insertedRow)
      res.json(insertedRow);                                

    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  }

  export const removeEmployee = async(req,res) =>{
    try {
      
      const { tour_detail_id ,tour_id, employee_id ,active } = req.body;
      const [rows] = await pool.query(`UPDATE tour_detail
                                        SET active=0
                                      WHERE tour_detail_id=?;`,[tour_detail_id]);

     const [result] = await pool.query(`select e.employee_number, e.employee_id,e.name ,e.last_name ,td.* from tour_detail td 
                                            inner join employees e on td.employee_id = e.employee_id
                                        where td.tour_id = ?`, [tour_id]);
      res.json(result);                                

    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  }

  export const getOpenTour = async(req,res) => {
    const { veicle_route_id } = req.params;
    try {
      const [rows] = await pool.query(`select * 
                                      from tours t 
                                      where t.veicle_route_id = ? 
                                      and t.start_date_time BETWEEN  CONCAT(CURRENT_DATE() , ' 00:00:01') 
                                      and CONCAT(CURRENT_DATE() , ' 23:59:59')`,[veicle_route_id]);


      var [detail] = [];
      console.log(rows.length)                                
      if(rows.length > 0){
        [detail]  = await pool.query(`select e.employee_number,e.employee_id,e.name ,e.last_name ,td.* from tour_detail td 
                                          inner join employees e on td.employee_id = e.employee_id
                                      where td.tour_id = ?`,[rows[0].tour_id]) 
      }                             
                                     
      res.json({message:'ok',tour:rows[0],detail:detail});    
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }

   
  }

  export const getOpenTourBoarding = async(req,res) => {
    const { employee_id } = req.params;
    try {
      const [rows] = await pool.query(`SELECT 
                                          td.tour_detail_id,
                                          t.tour_id,
                                          td.employee_id,
                                          COALESCE(td.confirmation_date_time,'') as confirmation_date_time,
                                          td.active  
                                       FROM tours t 
                                       INNER JOIN tour_detail td on t.tour_id = td.tour_id
                                      WHERE td.employee_id = ? 
                                      AND t.start_date_time BETWEEN  CONCAT(CURRENT_DATE() , ' 00:00:01') AND CONCAT(CURRENT_DATE() , ' 23:59:59')
                                      /*AND COALESCE(td.confirmation_date_time,0) = 0*/`,[employee_id]);

                                     
      res.json({message:'ok',tour:rows[0],detail:rows});    
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }

   
  }

  export const confirmTourBoarding = async (req, res) =>{

    const { tour_detail_id } = req.params;

    try {

      var query = `UPDATE tour_detail
                    SET confirmation_date_time=now()
                  WHERE tour_detail_id=?;`
      const [rows] = await pool.query(query,[tour_detail_id]);
  
      res.json(rows);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }   
  }

  export const startExternalTour = async (req, res) => {
    try {
      
       const { employee_id } = req.params; 
      
       const [rows] = await pool.query(
         'INSERT INTO tours ( veicle_route_id, start_date_time,start_odometer ) ' 
          +' VALUES(0,now(),0)',
         [ ]
       );

       const [detail] = await pool.query(`INSERT INTO tour_detail
                (tour_id, employee_id, active)
                VALUES( ?, ?, 1);`,[rows.insertId,employee_id]);
  
       res.json(detail);

       
     } catch (error) {
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };