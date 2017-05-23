var path       = require('path');

module.exports = {
    path       : path.normalize(path.join(__dirname, '..')),
    port       : 9000
  /*
  sequelize  : {
    dialect  : "mssql",
    dialectOptions : {
      requestTimeout: 1000000,
      options: {
        tdsVersion: '7_4'
      }
    },
    host     : "190.210.212.10", // "190.210.212.10", "ec2-54-152-235-52.compute-1.amazonaws.com",
    database : "cafci_develop", // "cafci_new", // "cafci_test_14", // "cafci_import_test",
    user     : "cafci_admin", // "cafci_admin" // "cafci_test_admin",
    password : "Congreso2171",
    debug    : false
  },
  appUrl: 'http://localhost:3333/',
  */
};
