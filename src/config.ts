
export default {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'mongodb://root:randompassword@localhost:27017/taxikea?authSource=admin'
}