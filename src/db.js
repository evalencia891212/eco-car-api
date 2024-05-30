import {createPool} from 'mysql2/promise';

//  export const pool = createPool({
//      host:"localhost",
//      user:"root",
//      password:".2Evaca60",
//      port:3306,
//      database:"eco-cars"
//  })

 export const environment = {
     production: false,
     mapBoxToken: 'pk.eyJ1IjoiZW1tYW51ZWw4OSIsImEiOiJjbHUyMmQ2emYwZ2lzMmp0Z2d1ZmZlMHhuIn0.94uy3X09yt6AQrArEw4bvg',
     apiHost: "http://localhost:3000"
   };

  export const pool = createPool({
      host:"66a1tk.stackhero-network.com",
      user:"root",
      password:"nDUxIwbJZPOcqoLYctucnCb19ZSzH44a",
      port:3306,
      database:"eco-cars"
  })