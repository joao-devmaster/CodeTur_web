import React, { useEffect, useState } from 'react';
import Menu from '../../../Componentes/Menu'
import Rodape from '../../../Componentes/Rodape';

import {Form, Button, Table, Card, Container, Jumbotron, FormGroup, FormCheck, Spinner} from 'react-bootstrap';
import PacoteServico from '../../../Servicos/pacoteservico';
import {useFormik} from 'formik';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';



 const Pacote = () => {
    
    useEffect(() =>{
        listarPacotes();
    }, []);
    
    const [pacotes , setPacotes] = useState([]);
    const { addToast } = useToasts();

    const formik = useFormik({
        initialValues : {
            titulo : '',
            descricao : '',
            imagem : '', 
            ativo: false
        },
        onSubmit : values => {
            PacoteServico.cadastrar(values).then(resultado => {
                if(resultado.sucesso){
                    addToast(resultado.data.mensagem, {
                        appearance: 'success',
                        autoDismiss: true,
                    })

                    formik.resetForm();
                    listarPacotes();
                }else{
                    addToast(resultado.data.mensagem, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
                
            })
            .catch(erro => {
                console.log(`erro ${erro}`);
            })
            formik.setSubmitting(false);
        },
        validationSchema :Yup.object().shape({
            titulo: Yup.string()         
              .min(3, 'O Título deve ter no minimo 3 caracteres')
              .max(120, 'O Título deve ter no máximo 120 caracteres')
              .required('Campo Título Obrigatório'),
            descricao: Yup.string()
              .required('Campo Descrição Obrigatório'),
            imagem: Yup.string()
              .required('Campo Imagem Obrigatório'),
          })
    })

   
    const listarPacotes = () => {
        PacoteServico.listar().then(resultado =>{
            console.log(`resultado ${JSON.stringify(resultado.data)}`)
            setPacotes(resultado.data.data)
        })
        .catch(error => {
            console.error(`erro ${error}`);
        })
    }

 
    

    return (
        <div>
            <Menu />
            <Container>
                {}
                <Jumbotron>
                    <h1>Pacotes</h1>
                    <p>Gerencie os Pacotes da CodeTur</p>
                </Jumbotron>
                <Card>
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit} >
                            <Form.Group>
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" 
                                            placeholder="Título do pacote" 
                                            name= 'titulo'
                                            value={formik.values.titulo} 
                                            onChange={formik.handleChange} 
                                            required>
                                                
                                            </Form.Control>
                                            {formik.errors.titulo && formik.touched.titulo ? (<div>{formik.errors.titulo}</div>): null}
                            </Form.Group>
                                                        
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} name='descricao' value={formik.values.descricao} onChange={formik.handleChange} required/>
                                {formik.errors.descricao && formik.touched.descricao ? (<div>{formik.errors.descricao}</div>): null}
                            </Form.Group>
                            <FormGroup>
                                <FormCheck 
                                 type='checkbox'
                                 label= 'Ativo'
                                 name= 'ativo'
                                 value={formik.values.ativo} 
                                 onChange={formik.handleChange}

                                />
                            </FormGroup>
                            <Form.Group>
                             <Form.File type='file' id="imagem" label="imagem" name='imagem'value={formik.values.imagem} onChange={formik.handleChange}   />
                             {formik.errors.imagem && formik.touched.imagem ? (<div>{formik.errors.imagem}</div>): null}
                            </Form.Group>

                            <Button type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? <Spinner animation="border" size="sm"/> : null }Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Ativo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            pacotes.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.imagem} style={{ width : '120px'}}/></td>
                                        <td>{item.titulo}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.ativo ? 'Ativo' : 'Inativo'}</td>
                                        <td>
                                            <Button variant="warning" value={item.id} >Editar</Button>
                                            <Button variant="danger" value={item.id}  style={{ marginLeft : '10px'}}>{item.ativo ? 'Desativar' : 'Ativar'}</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
            <Rodape />
        </div>
    )

}

export default Pacote;
