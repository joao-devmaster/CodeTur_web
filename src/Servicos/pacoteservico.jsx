import http from '../utils/http-axios.jsx';

const listar = () => {
    return http.get('package', {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-codetur')}`
        }
    });
}

const cadastrar = dados =>{
    return http.post('package', dados, {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-codetur')}`
        }
    })
}

const editar = dados =>{
    return http.post('package', dados, {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-codetur')}`
        }
    })
}

const desativar = dados =>{
    return http.post('package', dados, {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-codetur')}`
        }
    })
}


export default {
    listar,
    cadastrar,
    editar,
    desativar
}