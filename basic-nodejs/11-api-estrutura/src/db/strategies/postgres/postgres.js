const ICrud = require('../interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class PostgreSQL extends ICrud {
    constructor(connection, schema){
        super()
        this._connection = connection
        this._schema = schema
        //this._connect()
    }

    async isConnected(){
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.log('falhou'. error)
            return false;
        }

    }

    static async defineModel(connection, schema){
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        )
        await model.sync()
        return model
    }

    async create(item){
        //console.log('O item foi salvo no PostgreSQL!')
        const {
            dataValues
        } = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        return this._schema.findAll({ where: item, raw: true })
    }

    async update(id, item) {
        return this._schema.update(item, { where: { id: id } })
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._schema.destroy({ where: query })
    }
    
    static async connect(){
       const connection = new Sequelize(
            'postgres',
            'postgres',
            'root',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false,
                logging: false
            }
        )
        return connection
    }
}

module.exports = PostgreSQL