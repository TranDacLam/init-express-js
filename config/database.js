const env = process.env;

module.exports = {
  host: env.DB_HOST || 'localhost',
  user: env.DB_USER || 'root',
  password: env.DB_PASSWORD || 'root',
  database: env.DB_NAME || 'init-express-js',
};