
const app = require('./app');
const os = require('os');
const dotenv = require('dotenv')
dotenv.config({
  path: './.env'
})

const networkInterfaces = os.networkInterfaces();
const en0IPv4Address = networkInterfaces.en0.find(
    (ipAddress) => ipAddress.family === 'IPv4',
);

let HOSTNAME = en0IPv4Address.address;

var port = 9090;

// CHECK CONTROLL IN SERVER
app.use(function (req,res,next) {
  console.log(req)
  next()
})

/* create server */
// const server = app.listen(port, HOSTNAME, () => {
//   console.log(
//       `requestHubServer is process ID : ${process.pid}  and listening On :`,
//       `http://${HOSTNAME}:${port}`,
//   );
// });

const server = app.listen(port, () => {
  console.log(
      `requestHubServer is process ID : ${process.pid}  and listening On :`,
      `http://localhost:${port}`,
  );
});


/* prettier run command are
 npm run format
 or
  yarn format  */











