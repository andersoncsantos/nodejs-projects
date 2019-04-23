
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios')
const URL = 'https://swapi.co/api/people'

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

module.exports = {
    obterPessoas
}

// obterPessoas('batman')
//     .then(function (resultado){
//         console.log('resultado', resultado)
//     })
//     .catch(function (error) {
//         console.error('deu ruim', error)
//     })