const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function() {
            return resolve ({
                id: 1,
                nome: 'Usuario1',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve ({
                telefone: '91234-5678',
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback (null, {
            rua: 'Onde as ruas não tem nome',
            numero: 171
        })
    }, 2000);
}

main()
async function main() {
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('deu ruim', error)
    }

}

const usuarioPromise = obterUsuario()
usuarioPromise
    .then(function (usuario){
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result){
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
        })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        // console.log(`
        //     Nome: ${resultado.usuario.nome}
        //     Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        //     Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        // `)
        //console.log('resultado', resultado)
    })
    .catch(function (error){
        console.error('deu ruim', error)
    })

// function resolverUsuario(erro, usuario){
//     console.log('usuario', usuario)
    
// }

// obterUsuario(function resolverUsuario(error, usuario){
//     if(error){
//         console.log('deu ruim em usuario', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1){
//             console.log('deu ruim em telefone', error)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2){
//                 console.log('deu ruim em telefone', error)
//                 return;
//             }

//             console.log(`
//             Nome: ${usuario.nome},
//             Endereco: ${endereco.rua}, ${endereco.numero}
//             Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })
// })
