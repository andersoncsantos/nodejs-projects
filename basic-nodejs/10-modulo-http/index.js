const http = require('http')

http.createServer((request, response) => {
    response.end('Funcionou!!!')
})
.listen(3001, () => console.log('servidor no ar!'))
