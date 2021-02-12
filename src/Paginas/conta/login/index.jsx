import React from 'react';
import {useFormik} from 'formik';


import Menu from '../../../Componentes/Menu'
import Rodape from '../../../Componentes/Rodape';
import {Container, Form, Button, Alert} from 'react-bootstrap';

import './index.css';
import ContaServico from '../../../Servicos/contatoservico';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';


const Login = () => {

     // const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');

    const history = useHistory();
    const { addToast } = useToasts();
    const formik = useFormik({
        initialValues :{
            email : '',
            senha : ''
        },
        onSubmit : values => {
            ContaServico
                .logar(values)
                .then(resultado => resultado.json())
                .then(resultado => {
                    if(resultado.sucesso){
                        //apresenta notificação
                        addToast(resultado.data.mensagem, {
                            appearance: 'success',
                            autoDismiss: true,})
                        //salva token localstorage
                        localStorage.setItem('token-codetur', resultado.data.token);
                        //redireciona pagina admin
                        history.push('/admin');
                    } else {
                        addToast(resultado.data.mensagem, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    }
                
                })
                .catch(erro => {
                    console.error('erro na api ' + erro);
                })
        
        }
    })

    return (
        <div>
            <Menu />
            <Container className='form-height'>
                <Form className='form-signin' onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <small>Informe os dados Abaixo</small>
                        
                    <hr/>
                    <Form.Group >
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" 
                                     name="email"
                                     placeholder="Informe o email" 
                                     value={formik.values.email} 
                                     onChange={formik.handleChange} 
                                     required />
                        
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" 
                                     name="senha"
                                     placeholder="Senha"   
                                     value={formik.values.senha}
                                     onChange={formik.handleChange}
                                     required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                    <br/><br/>
                    <a href='/resetar-senha' style={{ marginTop :'30px'}}>Esqueci a senha!</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )

}

export default Login;