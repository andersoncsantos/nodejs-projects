const assert = require('assert')
const MongoDB = require('../db/strategies/mongoDB')
const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADSTRAR = {
    nome: 'Flash',
    poder: 'Velocidade'
}

const context = new Context(new MongoDB())
describe('MongoDB Suite de Testes', function() {
    this.beforeAll(async function() {
        await context.connect()
    })
    it('verificar conexão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        console.log('result', result)

        assert.deepEqual(result, expected)

    })
    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADSTRAR)
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADSTRAR)

    })
})