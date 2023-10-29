// define default config, but allow overrides from ENV vars
let config = {
  APP_DB_HOST: "3.82.161.206",
  APP_DB_USER: "root",
  APP_DB_PASSWORD: "pwd",
  APP_DB_NAME: "your_database",
};

Object.keys(config).forEach((key) => {
  if (process.env[key] === undefined) {
    console.log(
      `[NOTICE] Value for key '${key}' not found in ENV, using default value.  See app/config/config.js`
    );
  } else {
    config[key] = process.env[key];
  }
});

module.exports = config;
