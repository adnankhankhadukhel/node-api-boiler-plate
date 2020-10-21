const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['dev', 'production', 'test', 'staging'])
    .default('dev'),
  PORT: Joi.number().default(4000),
  API_VERSION: Joi.string()
    .default('1.0')
    .description('API Version'),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  MYSQL_DB: Joi.string()
    .default('coinage')
    .description('MySQL database name'),
  MYSQL_TEST_DB: Joi.string()
    .default('coinage-test')
    .description('MySQL database for tests'),
  MYSQL_PORT: Joi.number().default(3306),
  MYSQL_HOST: Joi.string().default('localhost'),
  MYSQL_USER: Joi.string()
    .required()
    .default('user')
    .description('MySql username'),
  MYSQL_PASSWORD: Joi.string()
    .allow('')
    .default('password')
    .description('MySql password'),
  MYSQL_SSL: Joi.bool()
    .default(false)
    .description('Enable SSL connection to MySql'),
  PUBLIC_URL: Joi.string()
    .required()
    .description('Please enter site domain url'),
  TOKENIZATION_API_KEY: Joi.string()
    .required()
    .description('Please enter in config tokenization api key'),
  TOKENIZATION_API_URL: Joi.string()
    .required()
    .description('Please enter in config tokenization api url'),

  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),

})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// if test, use test database
const isTestEnvironment = envVars.NODE_ENV === 'test';

const config = {
  env: envVars.NODE_ENV,
  isDirectoryApplicationLogsEnabled:
    envVars.IS_DIR_APPLICATION_LOGS_ENABLED || false,
  port: envVars.PORT,
  apiVersion: envVars.API_VERSION,
  jwtSecret: envVars.JWT_SECRET,
  jwtTokenExpiryInHours: envVars.JWT_TOKEN_EXPIRY_IN_HOURS || 100,
  jwtAdminTokenExpiryInHours: envVars.JWT_ADMIN_TOKEN_EXPIRY_IN_HOURS || 5,
  otpCodeLength: envVars.OTP_CODE_LENGTH || 6,
  otpExpiryTimeinSeconds: envVars.OTP_EXPIRE_SECONDS || 120,
  otpResendExpirty: envVars.OTP_RESEND_EXPIRY_SECONDS || 120,
  withdrawTokenExpiryTimeInMinutes: envVars.WITHDRAW_TOKEN_EXPIRY_TIME_IN_MINUTES || 3,
  maxLoginAttempts: envVars.MAX_LOGIN_ATTEMPTS || 5,
  loginAttemptsTime: envVars.LOGIN_ATTEMPTS_PERIOD_SECONDS || 3600,
  mysql: {
    db: isTestEnvironment ? envVars.MYSQL_TEST_DB : envVars.MYSQL_DB,
    port: envVars.MYSQL_PORT,
    host: envVars.MYSQL_HOST,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
  },
  s3: {
    enable: envVars.S3_ENABLED || false,
    bucketName: envVars.BUCKET_NAME,
  },
  passwordSalt: envVars.PASSWORD_SALT || 'saltiii',
  sendGrid: {
    enable: envVars.SENDGRID_ENABLED || false,
    mailKey: envVars.SENDGRID_MAIL_KEY,
  },
  emails: {
    formSubmissionFromEmail: envVars.EMAILS_FORM_SUBMISSION_FROM,
    adminNotificationEmail: envVars.EMAILS_TO_ADMIN_NOTIFICATION,
  },
  publicUrl: envVars.PUBLIC_URL,
  plivo: {
    enabled: envVars.PLIVO_ENABLED || 0,
    from: envVars.PLIVO_FROM,
    auth_id: envVars.PLIVO_AUTH_ID,
    auth_token: envVars.PLIVO_AUTH_TOKEN,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
  },
};

module.exports = config;
