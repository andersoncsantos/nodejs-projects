const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function (callback){
    const lista = []
    for(index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        if(!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main(){
    try {
        const {
            results
        } = await obterPessoas('a')

        // const larsFamily = results.filter(function (item) {
        //     const result = item.name.toLowerCase().indexOf('lars') !== -1
        //     return result
        // })

        const larsFamily = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = larsFamily.map((pessoa) => pessoa.name)
        console.log(names)
    } catch (error) {
        console.log('deu ruim', error)
        
    }
}

main()