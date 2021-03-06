const ICrud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1050))
        return STATUS[this._connection.readyState]

    }

    static connect() {
        Mongoose.connect('mongodb://localhost:27017/herois', { useNewUrlParser: true }, function (error) {
            if (!error) return;
            console.log('falha na conexão', error)
        })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando!!'))
        return connection
    }

    /* async create(item) {
        const resultCadastrar = await model.create({
            nome: 'Batman',
            poder: 'Dinheiro'
        })
        console.log('result cadastrar', resultCadastrar)
    } */

    create(item){
        return this._schema.create(item)
    }

    read(item, skip=0, limit=10){
        return this._schema.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        return this._schema.updateOne({ _id: id}, {$set: item })
    }

    delete(id) {
        return this._schema.deleteOne({_id: id})
    }
}

/* async function main() {
    const listItens = await model.find()
    console.log('itens', listItens)
}
main() */

module.exports = MongoDB
