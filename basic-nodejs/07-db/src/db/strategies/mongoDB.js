const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1050))
        return STATUS[this._driver.readyState]

    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        this._herois = Mongoose.model('heroi', heroiSchema)
    }

    connect() {
        Mongoose.connect('mongodb://localhost:27017/herois', { useNewUrlParser: true }, function (error) {
            if (!error) return;
            console.log('falha na conexão', error)
        })
        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('database rodando!!'))
        this.defineModel()
    }

    /* async create(item) {
        const resultCadastrar = await model.create({
            nome: 'Batman',
            poder: 'Dinheiro'
        })
        console.log('result cadastrar', resultCadastrar)
    } */

    create(item){
        return this._herois.create(item)
    }

    read(item, skip=0, limit=10){
        return this._herois.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        return this._herois.updateOne({ _id: id}, {$set: item })
    }

    delete(id) {
        return this._herois.deleteOne({_id: id})
    }
}

/* async function main() {
    const listItens = await model.find()
    console.log('itens', listItens)
}
main() */

module.exports = MongoDB
