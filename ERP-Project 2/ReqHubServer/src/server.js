const app = require('./app');
const os = require('os');

const networkInterfaces = os.networkInterfaces();
const en0IPv4Address = networkInterfaces.en0.find(
  (ipAddress) => ipAddress.family === 'IPv4'
);
let HOSTNAME = en0IPv4Address.address;

var port = 9090;

/* create server */
// const server = app.listen(port, HOSTNAME, () => {
//     console.log(
//         `requestHubServer is process ID : ${process.pid}  and listening On :`,
//         `http://${HOSTNAME}:${port}`,)
//
//
// });

const server = app.listen(process.env.PORT, function () {
  console.log(
    `requestHubServer is process ID : ${process.pid}  and listening On :`,
    `http://localhost:${process.env.PORT}`
  );
});

/* prettier run command are
 npm run format
 or
  yarn format  */
