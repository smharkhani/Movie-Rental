const jwt = require('jsonwebtoken');
const config = require('config');

exports.auth = async(req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send('Access Denied, no token provided');

  try{
    const decod = jwt.verify(token, config.get('jwtPrivateKey'))
    req.user = decod;
    next();
  }
  catch (err) {
    res.status(400).send('Invalid token');
  }
}