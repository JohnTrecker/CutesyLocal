const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD

module.exports = {
  'url' : `mongodb://${db_user}:${db_password}@ds163679.mlab.com:63679/cutesylocal`
};