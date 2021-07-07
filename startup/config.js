const config = require('config');

module.exports = function() {

  // set config 
  if(!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR: key privet key is not define");
    process.exit(1); 
  }

}