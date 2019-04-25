const assert = require('assert')
const MongoDB = require('../db/strategies/mongoDB')
const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
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
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () => {
        /* const teste = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        console.log('teste', teste) */
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    let MOCK_HEROI_ID = ''
    it('atualizar', async () => {
        const atualizar = await context.create(MOCK_HEROI_CADASTRAR)
        MOCK_HEROI_ID = atualizar._id
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Teste Atualização'
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})