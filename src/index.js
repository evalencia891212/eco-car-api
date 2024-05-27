import express from 'express'
import cors from 'cors'

import employeeRoutes from './routes/employees.routes.js'
import vehicleRoutes from './routes/vehicles.route.js'
import indexRoutes from './routes/index.routes.js'
import modelRoutes from './routes/models.routes.js'
import routeRoutes from './routes/route.routes.js'
import stationRoutes from './routes/stations.routes.js'
import officeRoute from './routes/office.routes.js'
import userRoute from './routes/user.routes.js'
import tourRoute from './routes/tour.routes.js'
import reportsRoute from './routes/reports.routes.js'

const app = express();

app.use(express.json());
//cors 
app.use(cors());
app.use(employeeRoutes);
app.use(vehicleRoutes);
app.use(indexRoutes);
app.use(modelRoutes);
app.use(routeRoutes);
app.use(stationRoutes);
app.use(officeRoute);
app.use(userRoute);
app.use(tourRoute);
app.use(reportsRoute);


port = process.env.PORT || 3000;

app.listen(port);

console.log('Server listen on port 3000');

//const webApp = express();

//const path = '/usr/dev/Caso Practico/eco-car-api/src/views/';
//const path = __dirname + '/views/';
//webApp.use(express.static(path));

//webApp.get('/', (req, res) => {
//    console.log(path + 'index.html')
//    res.sendFile(path + 'index.html');
//});

//webApp.listen(4200)

//console.log('views listen on port 4200');