import { pool } from "../db.js";

export const getStations = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM stations where active = 1");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  export const getStationsByRoute = async (req, res) => {
    const { route_id } = req.params;
    try {
      const [rows] = await pool.query(`select * from stations s 
                                        inner join routes_stations rs on s.station_id  =rs.station_id  
                                      where rs.active = 1 and s.active = 1 and rs.route_id  = ?`,[route_id]);
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  export const getStationsSequenceByRoute = async (req, res) => {
    const { route_id } = req.params;
    try {
      
      const [rows] = await pool.query(`select 
                                          rs.route_station_id,
                                          rs.sequence as 'current_sequence',
                                          rs.sequence as 'new_sequence', 
                                          s.* 
                                      from stations s
                                      inner join routes_stations rs on s.station_id  = rs.station_id 
                                      where rs.route_id  = ? and s.active = 1 order by sequence  `,[route_id]);

      res.json(rows);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  export const createStation = async (req, res) => {
    try {
       const { station_name,marker_type,course,check_in, location } = req.body; 
       const routes = req.body.routes;
       console.log(routes)
       const [rows] = await pool.query(
         'INSERT INTO stations (station_name,marker_type,course,check_in,location) ' 
          +' VALUES(?,?,?,?,?)',
         [ station_name,marker_type,course,check_in,location ]
       );

       const [insertedRow] = await pool.query("SELECT * FROM stations WHERE station_id = ?", [
        rows.insertId
      ]);


      let station_id = rows.insertId

      pool.query(
        `INSERT INTO routes_stations
        (route_id, station_id)
         VALUES ?`,
        [routes.map(route => [route.route_id, station_id])],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
    
          console.log("success: ", res);
          result(null, res);
        }
      );
    
       res.json(insertedRow);

       
     } catch (error) {
       return res.status(500).json({ message: "Something goes wrong: " + error.message });
     }
  };

  export const updateStation = async (req, res) => {
    try {
      const { station_id } = req.params;
      const { station_name, location, marker_type,course,check_in} = req.body;

      const [result] = await pool.query(
        'UPDATE stations SET station_name = IFNULL(?, station_name), '
        + 'location = IFNULL(?, location)' 
        + 'marker_type = IFNULL(?, marker_type)'
        + 'course = IFNULL=(?,course)'
        + 'check_in = IFNULL=(?,check_in)'
        + ' active = 1 '
        + '  WHERE station_id = ?',
        [station_name, location, marker_type,course,check_in, station_id]
      );

    
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Route not found" });
  
      const [rows] = await pool.query("SELECT * FROM stations WHERE station_id = ? ", [
        station_id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const deleteStation = async (req, res) => {
    try {
      const { station_id } = req.params;
      const [result] = await pool.query("UPDATE stations set active=0 WHERE station_id = ?", [station_id]);
  
      if (result.affectedRows <= 0) {
        return res.status(404).json({ message: "Route not found" });
      }

       const [rows] = await pool.query("SELECT * FROM stations WHERE active = 1", [
        station_id,
       ]);

       res.json(rows);
  
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
  };

  export const updateSequence = async (req, res) => {

    const { route_id } = req.params;

    try {
  
     const routes_stations = req.body

      var query = "";
     
      for(var i=0; i<req.body.length; i++) {
        
          var new_sequence = req.body[i].new_sequence;
          var station_id = req.body[i].station_id;
          console.log("sequence", new_sequence);
          await pool.query(`UPDATE routes_stations SET sequence = ${new_sequence} WHERE route_station_id = ${req.body[i].route_station_id} `);
          
      }
        
        console.log(query);
        // pool.query( ` INSERT INTO routes_stations (route_station_id,sequence)
        //                 VALUES ?
        //               ON DUPLICATE KEY UPDATE
        //               route_station_id=VALUES(route_station_id)`,
        // [routes_stations.map(station => [station.route_station_id,station.new_sequence])],
        // (err, res) => {
        //   if (err) {
        //     console.log("error: ", err);
        //     result(err, null);
        //     return;
        //   }
    
        //   console.log("success: ", res);
        //   result(null, res);
        // });

       
        const [rows] = await pool.query(`select 
                                          rs.route_station_id,
                                          rs.sequence as 'current_sequence',
                                          rs.sequence as 'new_sequence', 
                                          s.* 
                                      from stations s
                                      inner join routes_stations rs on s.station_id  = rs.station_id 
                                      where rs.route_id  = ? and s.active = 1 order by sequence `,[route_id]);

      res.json(rows);
  

      
    
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }
      
    
  };

 

