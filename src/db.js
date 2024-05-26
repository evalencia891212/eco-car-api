import {createPool} from 'mysql2/promise';

export const pool = createPool({
    host:"localhost",
    user:"root",
    password:".2Evaca60",
    port:3306,
    database:"eco-cars"
})