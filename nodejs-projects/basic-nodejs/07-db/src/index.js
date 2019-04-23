const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongoDB')
const PostgreSQL = require('./db/strategies/postgreSQL')

const contextMongoDB = new ContextStrategy(new MongoDB())
contextMongoDB.create()

const contextPostgreSQL = new ContextStrategy(new PostgreSQL())
contextPostgreSQL.create()

