const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_url = process.env.DB_URL;
let mongoDBurl;

if (process.env.NODE_ENV === 'production') mongoDBurl = `mongodb://${db_user}:${db_password}@${db_url}`;
else mongoDBurl = 'mongodb://localhost:27017/cutesy';

module.exports = {
  'url' : mongoDBurl
};