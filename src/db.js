import {createPool} from 'mysql2/promise';

// export const pool = createPool({
//     host:"localhost",
//     user:"admin",
//     password:"heroku-pass-123",
//     port:3306,
//     database:"eco-cars"
// })

 export const pool = createPool({
     host:"66a1tk.stackhero-network.com",
     user:"root",
     password:"nDUxIwbJZPOcqoLYctucnCb19ZSzH44a",
     port:3306,
     database:"eco-cars"
 })