const logar = dados => {
    return fetch('https://192.168.1.27:5001/v1/account/signin',{
        method : 'POST',
        body : JSON.stringify(dados),
        headers : {
            'content-type' : 'application/json' 
        }
    })
}

const resetarSenha = dados => {
    return fetch('https:///192.168.1.27:5001/v1/account/reset-password',{
        method : 'POST',
        body : dados,
        headers : {
            'content-type' : 'application/json'
        }
    })
}

export default{
    logar,
    resetarSenha
}