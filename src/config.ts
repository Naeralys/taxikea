export const ENVIRONMENT = {
  TEST: 'test',
  DEVELOPMENT: 'dev'
}

export default {
  ENVIRONMENT: process.env.ENVIRONMENT || ENVIRONMENT.DEVELOPMENT,
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'mongodb://root:randompassword@localhost:27017/taxikea?authSource=admin'
}